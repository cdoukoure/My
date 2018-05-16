from __future__ import unicode_literals

from django.db import models

# CORE MODEL
from datetime import datetime, timedelta
import pytz
import string
import random
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Q
from django.utils.html import escape, mark_safe
from django.utils.translation import ugettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver
# For hierarchical data
from polymorphic.models import PolymorphicModel
from mptt.models import MPTTModel, TreeForeignKey
# from polymorphic_tree.models import PolymorphicMPTTModel, PolymorphicTreeForeignKey

# For Saas feature
# import django_multitenant
#from django_multitenant.django_multitenant import *

from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class Table(models.Model):

    name = models.CharField(max_length=30)
    description = models.TextField(null=True)
    
    # table_parent = models.ForeignKey('Table', on_delete=models.CASCADE, related_name='table_parent')
    
    """ cell_collection = models.ManyToManyField(Cell, through='Column', related_name='+') """

    def __str__(self):
        return self.name
    
    """
    @property
    def column_collection(self):
        # Return list of columns
        for table in self:
            columns = [{"name":col.name, "label":col.label, "options": col.options, "nullable":col.nullable} for col in Column.filter(table=table)]
            return columns

    @property
    def row_collection(self):
        # Return list of columns
        for table in self:
            rows = Row.filter(table=table).cell_collection
            return rows
    """

class Column(models.Model):

    TEXT = 'text'
    CHECKBOX = 'checkbox'
    TEXTAREA = 'textarea'
    RADIO = 'radio'
    SELECT = 'select'
    DATE = 'date'
    NUMBER = 'number'
    FIELD_TYPE_CHOICES = (
        (TEXT, 'Text'),
        (TEXTAREA, 'Text zone'),
        (NUMBER, 'Number'),
        (CHECKBOX, 'Checkboxe (for many options with multi choices)'),
        (RADIO, 'Radio button (for many options with single choice. Up to 3 options)'),
        (SELECT, 'Radio button (for many options with single choice. More than 3 options)'),
        (DATE, 'Date (Calendar)'),
    )
    
    type = models.CharField(
        choices=FIELD_TYPE_CHOICES,
        default=TEXT,
        max_length=100
    )
    name = models.CharField(max_length=30)
    label = models.CharField(max_length=30)
    options = models.TextField(blank=True, null=True)
    nullable = models.BooleanField(default=True)
    
    table = models.ForeignKey(Table, on_delete=models.CASCADE, related_name='columns')
    
    # cell = models.ForeignKey('Cell', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name


class Row(models.Model):

    table = models.ForeignKey(Table, on_delete=models.CASCADE, related_name='rows')
    
    cells = models.ManyToManyField(Column, through='Cell', related_name='+')

    def __str__(self):
        return self.name
    """
    @property
    def cell_collection(self):
        # Return list of columns
        for row in self:
            cells = [{"type":cell.column.type, "value":cell.value} for cell in Cell.filter(row=row)]
            return cells
    """

class Cell(models.Model):

    row = models.ForeignKey('Row', on_delete=models.CASCADE)
    column = models.ForeignKey('Column', on_delete=models.CASCADE)
    value = models.CharField(max_length=500)

#############################################################
#                                                           #
#           MYSCHOOL                                        #
#                                                           #
#############################################################

# SIS
class MyGradeScale(models.Model):
    """ Translate a numeric grade to some other scale.
    Example: Letter grade or 4.0 scale. """
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return '{}'.format(self.name)

    def get_rule(self, grade):
        if grade is not None:
            return self.gradescalerule_set.filter(min_grade__lte=grade, max_grade__gte=grade).first()

    def to_letter(self, grade):
        rule = self.get_rule(grade)
        if rule:
            return rule.letter_grade

    def to_numeric(self, grade):
        rule = self.get_rule(grade)
        if rule:
            return rule.numeric_scale


class MyGradeScaleRule(models.Model):
    """ One rule for a grade scale.  """
    min_grade = models.DecimalField(max_digits=5, decimal_places=2)
    max_grade = models.DecimalField(max_digits=5, decimal_places=2)
    letter_grade = models.CharField(max_length=50, blank=True)
    numeric_scale = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    grade_scale = models.ForeignKey(GradeScale)

    class Meta:
        unique_together = ('min_grade', 'max_grade', 'grade_scale')

    def __str__(self):
        return '{}-{} {} {}'.format(self.min_grade, self.max_grade, self.letter_grade, self.numeric_scale)

class MySchoolYear(models.Model):
    name = models.CharField(max_length=255, unique=True)
    # start_date = models.DateField(validators=settings.DATE_VALIDATORS)
    start_date = models.DateField()
    end_date = models.DateField()
    grad_date = models.DateField(blank=True, null=True)
    grade_scale = models.ForeignKey(MyGradeScale, blank=True, null=True, help_text="Alternative grade scale such as letter grades or a 4.0 scale")
    active_year = models.BooleanField(default=False,
        help_text="DANGER!! This is the current school year. There can only be one and setting this will remove it from other years. " \
                  "If you want to change the active year you almost certainly want to click Management, Change School Year.")
    # benchmark_grade = models.BooleanField(default=get_default_benchmark_grade,
    #                                       help_text="Causes additional information to appear on transcripts. The configuration option \"Benchmark-based grading\" sets the default for this field.")

    class Meta:
        ordering = ('start_date',)

    def __str__(self):
        return "{0}/{1}".format(self.start_date, self.end_date)

    """
    def get_number_days(self, date=date.today()):
        "" Returns number of active school days in this year, based on
        each marking period of the year.
        date: Defaults to today, date to count towards. Used to get days up to a certain date""
        mps = self.markingperiod_set.filter(show_reports=True).order_by('start_date')
        day = 0
        for mp in mps:
            day += mp.get_number_days(date)
        return day
    """

    def save(self, *args, **kwargs):
        super(MySchoolYear, self).save(*args, **kwargs)
        if self.active_year:
            all = MySchoolYear.objects.exclude(id=self.id).update(active_year=False)

class MyCourseType(models.Model):
    ''' Some course types, e.g. honors or AP, may have uncommon settings.
    For consistency, the default data includes a "Normal" type. '''
    name = models.CharField(max_length=255, unique=True) # name = Regular, Honors, AP, IB, College
    is_default = models.BooleanField(default=False, help_text="Only one course " \
        "type can be the default.")
    weight = models.DecimalField(max_digits=5, decimal_places=2, default=1,
        help_text="A course's weight in average calculations is this value "
            "multiplied by the number of credits for the course. A course that "
            "does not affect averages should have a weight of 0, while an "
            "honors course might, for example, have a weight of 1.2.")
    award_credits = models.BooleanField(default=True,
        help_text="When disabled, course will not be included in any student's "
            "credit totals. However, the number of credits and weight will "
            "still be used when calculating averages.")
    boost = models.DecimalField(max_digits=5, decimal_places=2, default=0)


    
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        ''' If I am the default, no other CourseType can be! '''
        super(MyCourseType, self).save(*args, **kwargs)
        if self.is_default:
            MyCourseType.objects.exclude(pk=self.pk).update(is_default=False)

    @staticmethod
    def build_default():
        """ Always reference this function when creating the default """
        return MyCourseType.objects.get_or_create(name='Normal-Test', is_default=True)[0]


def get_course_type_default():
    try:
        return MyCourseType.objects.get(is_default=True).pk
    except MyCourseType.DoesNotExist:
        return MyCourseType.build_default().pk

class MyCourse(models.Model): # Matière
    is_active = models.BooleanField(default=True)
    fullname = models.CharField(max_length=255, unique=True, verbose_name="Full Course Name")
    shortname = models.CharField(max_length=255, verbose_name="Short Name")
    code = models.CharField(verbose_name=_('Code'), max_length=8, unique=True)
    # homeroom = models.BooleanField(default=False, help_text="Homerooms can be used for attendance")
    # graded = models.BooleanField(default=True, help_text="Teachers can submit grades for this course")
    description = models.TextField(blank=True)
    credits = models.DecimalField(max_digits=5, decimal_places=2,
        help_text="Credits affect GPA.",
        # WARNING: this default must NOT be used for migrations! Courses whose
        # credits=None should have their credits set to 0
        default=0)
    department = models.ForeignKey(MyDepartment, blank=True, null=True)
    # level = models.ForeignKey(GradeLevel, blank=True, null=True, verbose_name="Grade Level")
    """
    course_type = models.ForeignKey(MyCourseType,
        help_text='Should only need adjustment when uncommon calculation ' \
        'methods are used.',
        default=get_course_type_default,
    )
    """
    course_type = models.CharField(
        choices=(('theory', 'Theory'), ('practical', 'Practical'),
         ('both', 'Both'), ('other', 'Other'),),
        default='theory',
        max_length=9
    )
    evaluation_type = models.CharField(
        choices=(('normal', 'Normal'), ('GPA', 'GPA'), ('CWA', 'CWA'), ('CCE', 'CCE'),),
        default='normal',
        max_length=6
    )
    # grade_weightage = models.FloatField(verbose_name=_('Grade Weightage'))

    def __str__(self):
        return "{0}-{0}".format(self.code, self.fullname)

    @staticmethod
    def autocomplete_search_fields():
        return ("shortname__icontains", "fullname__icontains",)

    # def get_enrolled_students(self):
    #     return Student.objects.filter(courseenrollment__section=self)

"""
class MyCourseSectionTeacher(models.Model):
    teacher = models.ForeignKey(User, limit_choices_to={'user_type': 'staff-teacher'})
    course_section = models.ForeignKey('MyCourseSection')
    is_primary = models.BooleanField(default=False)

    class Meta:
        unique_together = ('teacher', 'course_section')
"""

class MyCourseSection(models.Model):
    course = models.ForeignKey(MyCourse, related_name='sections')
    is_active = models.BooleanField(default=True)
    name = models.CharField(max_length=255)
    # marking_period = models.ManyToManyField(MarkingPeriod, blank=True)
    # periods = models.ManyToManyField(Period, blank=True, through=CourseMeet)
    # teachers = models.ManyToManyField(User, through=MyCourseSectionTeacher, blank=True)
    # enrollments = models.ManyToManyField('sis.Student', through=CourseEnrollment, blank=True, null=True)
    # cohorts = models.ManyToManyField('sis.Cohort', blank=True, null=True)
    # last_grade_submission = models.DateTimeField(blank=True, null=True, editable=False)
    grade_weightage = models.FloatField(verbose_name=_('Grade Weightage'))
    type = models.CharField(
        choices=(('theory', 'Theory'), ('practical', 'Practical'),
         ('both', 'Both'), ('other', 'Other'),),
        default='theory',
        max_length=9
    )

    def __str__(self):
        return u'{}: {}'.format(self.course, self.name)

    @property
    def department(self):
        return self.course.department

    # @property
    # def level(self):
    #     """ Course grade level """
    #    return self.course.level

    @property
    def credits(self):
        return self.course.credits

    @property
    def description(self):
        """ Course description """
        return self.course.description

    @property
    def fullname(self):
        """ Course full name """
        return self.course.fullname

    @property
    def shortname(self):
        """ Course short name """
        return self.course.shortname

    # def get_todays_period(self):
    #    """ Useful if you want to know today's schedule """
    #    return self.periods.filter(coursemeet__day__exact=datetime.date.today().isoweekday()).first()


    @property
    def teacher(self):
        """ Show just the primary teacher, or any if there is no primary """
        course_teacher = self.coursesectionteacher_set.all().order_by('-is_primary').first()
        if course_teacher:
            return course_teacher.teacher

    # def number_of_students(self):
    #    return self.enrollments.count()
    # number_of_students.short_description = "# of Students"

    # def grades_link(self):
    #     link = '<a href="{}" class="historylink"> Grades </a>'.format(
    #         reverse('course-section-grades', args=(self.pk,))
    #     )
    #     return link
    # grades_link.allow_tags = True

    # def calculate_final_grade(self, student):
    #     """ Shim code to calculate final grade WITHOUT cache """
    #     enrollment = self.courseenrollment_set.get(user=student)
    #    return enrollment.calculate_grade_real()

    # def populate_all_grades(self):
    #    """
    #    calling this method calls Grade.populate_grade on each combination
    #    of enrolled_student + marking_period + course_section
    #    """
    #    for student in self.enrollments.all():
    #        for marking_period in self.marking_period.all():
    #            Grade.populate_grade(
    #                student = student,
    #                marking_period = marking_period,
    #                course_section = self
    #                )

    # def save(self, *args, **kwargs):
    #     super(CourseSection, self).save(*args, **kwargs)
    #    ''' HEY, YOU! This save() method can't see any M2M changes!
    #    Read http://stackoverflow.com/a/1925784. To handle users changing the
    #    selected MarkingPeriods, I'm writing CourseSectionAdmin.save_model(),
    #    which will also call populate_all_grades(). You may need additional
    #    handling if you implement another edit interface outside of Django
    #    admin. '''
    #    self.populate_all_grades()

    """
    def copy_instance(self, request):
        changes = (("name", self.name + " copy"),)
        new = duplicate(self, changes)
        for enroll in self.courseenrollment_set.all():
            new_enrollment = CourseEnrollment(
                course_section=new,
                user=enroll.user,
                attendance_note=enroll.attendance_note
            )
            new_enrollment.save()
            for day in enroll.exclude_days.all():
                new_enrollment.exclude_days.add(day)
        for cm in self.coursemeet_set.all():
            new.coursemeet_set.create(
                location=cm.location,
                day=cm.day,
                period=cm.period
            )
        for teacher in self.coursesectionteacher_set.all():
            CourseSectionTeacher(
                course_section=new,
                teacher=teacher.teacher,
                is_primary=teacher.is_primary
            ).save()
        new.save()
        messages.success(request, 'Copy successful!')
    """

class MyAward(models.Model):
    name = models.CharField(max_length=255)
    badge = models.ImageField(null=True, blank=True, upload_to="student_award_badges/%Y/%m/%d/")

    def __str__(self):
        return self.name

class MyAwardStudent(models.Model):
    award = models.ForeignKey(Award)
    student = models.ForeignKey(User, related_name='my_awards', limit_choices_to={'user_type': 'student'})
    school_year = models.ForeignKey(MySchoolYear, on_delete=models.SET_NULL)

class MyMessageToStudent(models.Model):
    """ Stores a message to be shown to students for a specific amount of time
    """
    message = RichTextField(help_text="This message will be shown to students when they log in.")
    start_date = models.DateField(default=date.today)
    end_date = models.DateField(default=date.today)
    course_sections = models.ManyToManyField(MyCourseSection)
    def __str__(self):
        return self.message

"""
class MySubject(models.Model): # Cours Ex MATHEMATIQUE
    name = models.CharField(verbose_name=_('Name'), max_length=128)
    code = models.CharField(verbose_name=_('Code'), max_length=256, unique=True)
    # courses = models.ForeignKey(MyCourse, blank=True, null=True, on_delete=models.SET_NULL, related_name='subjects')
    courses = models.ManyToManyField(MyCourse, verbose_name=_('Course(s)')
    grade_weightage = models.FloatField(verbose_name=_('Grade Weightage'))
    type = models.CharField(
        choices=(('theory', 'Theory'), ('practical', 'Practical'),
         ('both', 'Both'), ('other', 'Other'),),
        default='theory',
        max_length=9
    )
    
    class Meta:
        # unique_together = (("driver", "restaurant"),)
        unique_together = ("name", "code")
    
    def __str__(self):
        return "{0}-{0}".format(self.code, self.name)

""
class MyBatch(models.Model): # Class Ex ING2, ING1

    code = models.CharField(max_length=8)
    name = models.CharField(max_length=32)
    start_date = models.DateTimeField(verbose_name=_('Start Date'), default=timezone.now)
    end_date = models.DateTimeField(verbose_name=_('End Date'))
    course = models.ForeignKey(MyCourse, on_delete=models.CASCADE, related_name='batchs')

    def __str__(self):
        return self.name
"""

"""
class MyProgram(models.Model)
    level = models.CharField(
        choices=(('licence', 'Licence'), ('master', 'Master'),
         ('doctorat', 'Doctorat'), ('other', 'Other'),),
        default='licence',
        max_length=9
    )
    courses = models.ManyToManyField(MyCourse, verbose_name=_('Course(s)'), limit_choices_to={'level': 'self.level'}, through='MyClassSection')
    
class MyClass(models.Model)
    programm = models.ForeignKey(MyProgram, on_delete=models.CASCADE, related_name='classes')

class MyClassSection(models.Model)
    programm = models.ForeignKey(MyProgram, on_delete=models.CASCADE, related_name='classes')
    enrollments = models.ManyToManyField(User, limit_choices_to={'user_type': 'student'})
    courses = models.ManyToManyField(MyClassSectionCourseAssignment, verbose_name=_('Course(s)'), limit_choices_to={'level': 'self.level'}, through='MyClassSection')
    school_year =


departement 1:m teacher
departement 1:m program
program m:m course
course m:m teacher
program 1:m class_section 1:m timetable
"""
class User(MPTTModel, AbstractUser):

    TECHNI_SUPER = 'technical-super'
    TECHNI_ADMIN = 'technical-admin'
    TECHNI_SUPPORT = 'technical-support'
    SCHOOL_SUPER = 'school-super'
    SCHOOL_ADMIN = 'school-admin'
    SCHOOL_STAFF = 'school-staff'
    SCHOOL_TEACHER = 'school-teacher'
    SCHOOL_STUDENT = 'school-student'
    FIELD_TYPE_CHOICES = (
        (TECHNI_SUPER, 'Technical Super Administrator'),
        (TECHNI_ADMIN, 'Technical Administrator'),
        (TECHNI_SUPPORT, 'Technical Support'),
        (SCHOOL_SUPER, 'School Super Administrator'),
        (SCHOOL_ADMIN, 'School Administrator'),
        (SCHOOL_STAFF, 'School staff'),
        (SCHOOL_TEACHER, 'School teacher'),
        (SCHOOL_STUDENT, 'Student'),
    )
    user_type = models.CharField(
        choices=FIELD_TYPE_CHOICES,
        default=SCHOOL_STUDENT,
        max_length=20
    )
    # is_online_instructor = models.BooleanField(default=False)
    # TO-DO: Create method to invite and connect IT Manager
    referral_code = models.CharField(max_length=9, verbose_name=_('Referral Code'), default='')
    parent_referral_code = models.CharField(max_length=9, verbose_name=_('Parent Referral Code'), blank=True, null=True)

    parent = TreeForeignKey('self', null=True, blank=True, on_delete=models.DO_NOTHING, related_name='children', db_index=True)
    
    class MPTTMeta:
        order_insertion_by=['username']
        
    def save(self, *args, **kwargs):
        if not self.pk:
            self.referral_code = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(9))
            parent = User.objects.get(referral_code=kwargs.get('parent_referral_code', null))
            self.parent = parent
        super().save(*args, **kwargs)  # Call the "real" save() method.
        # do_something_else()

    def delete(self, *args, **kwargs):
        parent = self.parent
        root = self.get_root()
        if parent:
            for child in self.get_children():
                # print "Working on", child.first_name, "to parent", parent.email
                #current_child = MyPartner.objects.get(id = child.id)
                child.move_to(parent, 'last-child')
                child.save()
        else:
            for child in self.get_children():
                # print "Working on", child.first_name, "to parent", parent.email
                #current_child = MyPartner.objects.get(id = child.id)
                child.move_to(root, 'last-child')
                child.save()
        super().delete(*args, **kwargs)  # Call the "real" save() method.
        # do_something_else()

"""
class User(AbstractUser, MPTTModel):
    user_type = models.CharField(
        choices=(('technical-super', 'Technical Super Administrator'), ('technical-admin', 'Technical Administrator'), ('staff-scholarship', 'Scholarship Administrator'), ('staff-owner', 'University Owner'), ('staff-it-manager', 'IT Manager'), ('staff-it-user', 'IT User'), ('staff-ufr-manager', 'UFR Manager'), ('staff-dpt-manager', 'Departement/School Manager'), ('staff-service', 'University staff'), ('instructor', 'Instructor'), ('student', 'Student'),),
        default='student',
        max_length=20
    ) # TO-DO: Create method to invite and connect IT Manager
    # Specific for student
    course  = models.ForeignKey(MyCourse, blank=True, null=True, on_delete=models.SET_NULL)
    batch  = models.ForeignKey(MyBatch, blank=True, null=True, on_delete=models.SET_NULL)
    gr_no = models.CharField(verbose_name=_("GR Number"), max_length=20)
    # referral_code = models.CharField(max_length=9, verbose_name=_('Referral Code'), default=''.join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(9)))
    parent_referral_code = models.CharField(max_length=9, verbose_name=_('Parent Referral Code'), blank=True, null=True)
    
    @property
    def roll_number(self):
        # TO_DO:: Improve the logic by adding sequence field in course.
        if self.rollnumbers:
            for roll_no in self.rollnumbers:
                if roll_no.course  == self.course  and \
                        roll_no.batch  == self.batch :
                    self.roll_number = roll_no.roll_number
        else:
            self.roll_number = 0
        return self.roll_number

    class Meta(PolymorphicMPTTModel.Meta):
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def save(self, *args, **kwargs):
        if not self.pk:
            parent = User.objects.get(referral_code=kwargs.get('parent_referral_code', null))
            self.parent = parent
        super().save(*args, **kwargs)  # Call the "real" save() method.
        # do_something_else()

    def delete(self, *args, **kwargs):
        parent = self.parent
        for child in self.get_children():
            # print "Working on", child.first_name, "to parent", parent.email
            #current_child = MyPartner.objects.get(id = child.id)
            child.move_to(parent, 'last-child')
            child.save()
        super().delete(*args, **kwargs)  # Call the "real" save() method.
        # do_something_else()
"""

class MySchool(models.Model):

    date = models.DateTimeField(db_index=True, default=timezone.now)
    ref = models.CharField(verbose_name=_('Internal Reference'), db_index=True, max_length=128)
    # lang = fields.Selection(_lang_get, verbose_name=_('Language', default=lambda self: self.env.lang,
    #                        help_text="If the selected language is loaded in the system, all documents related to "
    #                             "this contact will be printed in this language. If not, it will be English.")
    # tz = fields.Selection(_tz_get, verbose_name=_('Timezone', default=lambda self: self._context.get('tz'),
    #                       help_text="The partner's timezone, used to output proper date and time values "
    #                           "inside printed reports. It is important to set a value for this field. "
    #                           "You should use the same timezone that is otherwise used to pick and "
    #                           "render date and time values: your computer's timezone.")
    #tz_offset = models.CharField(compute='_compute_tz_offset', verbose_name=_('Timezone offset', invisible=True)
    vat = models.CharField(verbose_name=_('Tax Identification Number'), max_length=18, blank=True, null=True)
    website = models.URLField(verbose_name=_('Website of Partner or Company'), blank=True, null=True)
    comment = models.TextField(verbose_name=_('Notes'))

    #category  = fields.Many2many('res.partner.category', column1='partner ',
    #                                column2='category ', verbose_name=_('Tags', default=_default_category)
    
    credit_limit = models.FloatField(verbose_name=_('Credit Limit'))
    barcode = models.CharField(verbose_name='ean13', max_length=128)
    active = models.BooleanField(default=True)
    street = models.CharField(max_length=128)
    street2 = models.CharField(max_length=128)
    zip = models.CharField(max_length=6)
    city = models.CharField(max_length=128)
    # state = models.ForeignKey(State, verbose_name=_('State'), blank=True, null=True, on_delete=models.SET_NULL)
    # country = models.ForeignKey(Country, verbose_name=_('Country'), blank=True, null=True, on_delete=models.SET_NULL)
    # email = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField(
        verbose_name='email address',
        max_length=50,
        unique=True,
    )
    # email_formatted = models.CharField(
    #    'Formatted Email', compute='_compute_email_formatted',
    #    help_text='Format email address "Name <email@domain>"')
    mobile_number = PhoneNumberField(null=True, blank=True)
    phone_number = PhoneNumberField(null=True, blank=True)

    school_type = models.CharField(
        choices=(('primary-school', 'Primary school'), ('secondary-school', 'Secondary school'), ('high-school', 'High school'), ('university', 'University'),),
        default='high-school',
        max_length=17
    )
        
    # image: all image fields are base64 encoded and PIL-supported
    # image = models.ImageField(null=True, blank=True, upload_to="uploads/%Y/%m/%d/avatars/")
    # image_medium = models.ImageField(null=True, blank=True, upload_to="uploads/%Y/%m/%d/avatars/")
    # image_small = models.ImageField(null=True, blank=True, upload_to="uploads/%Y/%m/%d/avatars/")

    def __str__(self):
        return self.name
    
class MyDepartment(MPTTModel):

    parent = TreeForeignKey('self', null=True, blank=True, on_delete=models.DO_NOTHING, related_name='children', db_index=True)

    name = models.CharField(db_index=True, max_length=128)

    responsible = models.ForeignKey(User, verbose_name=_('Responsible'), related_name='my_department', limit_choices_to={'user_type': 'school-staff'}, null=True, blank=True, on_delete=models.SET_NULL)

    school = models.ForeignKey(MySchool, related_name='departments', on_delete=models.CASCADE)

    def delete(self, *args, **kwargs):
        parent = self.parent
        root = self.get_root()
        if parent:
            for child in self.get_children():
                # print "Working on", child.first_name, "to parent", parent.email
                #current_child = MyPartner.objects.get(id = child.id)
                child.move_to(parent, 'last-child')
                child.save()
        super().delete(*args, **kwargs)  # Call the "real" save() method.
        # do_something_else()


class MyPartner(PolymorphicModel):

    user = models.OneToOneField(User, related_name='partner', on_delete=models.CASCADE, primary_key=True)
    # partner  = models.ForeignKey('Partner', on_delete=models.CASCADE) # User Auth
    middle_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    birth_date = models.DateTimeField(default=timezone.now, verbose_name="Date de naissance")
    blood_group = models.CharField(
        choices=(('A+', 'A+ve'), ('B+', 'B+ve'), ('O+', 'O+ve'), ('AB+', 'AB+ve'),
         ('A-', 'A-ve'), ('B-', 'B-ve'), ('O-', 'O-ve'), ('AB-', 'AB-ve'),),
        default='O-',
        max_length=5
    )
    gender = models.CharField(
        choices=(('male', 'Male'), ('female', 'Female'),),
        default='male',
        max_length=6
    )
    # emergency_contact = models.ForeignKey(User, related_name='legal_childre', blank=True, null=True, on_delete=models.CASCADE)
    visa_info = models.CharField(max_length=64, blank=True, null=True)
    id_number = models.CharField(max_length=64)
    # avatar = models.ImageField(null=True, blank=True, upload_to="uploads/%Y/%m/%d/avatars/")
    street = models.CharField(max_length=128)
    street2 = models.CharField(max_length=128)
    zip = models.CharField(max_length=128)
    city = models.CharField(max_length=128)
    # state = models.ForeignKey(MyState, verbose_name=_('State'), on_delete=models.RESTRICT)
    # country = models.ForeignKey(MyCountry, verbose_name=_('Country'), blank=True, null=True, on_delete=models.SET_NULL)
    # email = models.CharField(max_length=200)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    mobile_number = PhoneNumberField()
    phone_number = PhoneNumberField(blank=True)
    is_newsletter = models.BooleanField(default=True)
    organisation = models.ForeignKey(MyOrganisation, blank=True, null=True, on_delete=models.SET_NULL)
    
    def __str__(self):
        return "Profil de {0} {0}".format(self.middle_name, self.last_name)

@receiver(post_save, sender=User)
def create_user_mypartner(sender, instance, created, **kwargs):
    if created:
        MyPartner.objects.create(User=instance)
    group, created = Group.objects.get_or_create(name=instance.user_type)
    instance.groups.add(group)


@receiver(post_save, sender=User)
def save_user_mypartner(sender, instance, **kwargs):
    instance.partner.save()

# class MyStudent(MyPartner):
# class MyInstructor(MyPartner):

class MyOnlineCourse(models.Model):
    title = models.CharField(max_length=300)
    subtitle = models.CharField(max_length=300)
    description = models.TextField()
    badge = models.ImageField(null=True, blank=True, upload_to="online_courses/%Y/%m/%d/badge/")
    image = models.ImageField(null=True, blank=True, upload_to="online_courses/%Y/%m/%d/image/")
    is_free = models.BooleanField('Is free', default=False)
    price = models.FloatField(max_length=5)
    status = models.CharField(
        choices=(('draft', 'Draft'), ('submitted', 'Submitted'), ('rejected', 'Rejected'),
         ('change', 'Change Req.'), ('accepted', 'Accepted'),),
        default='draft',
        max_length=7,
        verbose_name=_('Status')
    )
    rate = models.IntegerField()
    # USER
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='my_online_courses')
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def get_html_badge(self):
        name = escape(self.name)
        color = escape(self.color)
        html = '<span class="badge badge-primary" style="background-color: %s">%s</span>' % (color, name)
        return mark_safe(html)

class MyOnlineSkill(models.Model): # Class Ex ING2, ING1
    description = models.CharField(max_length=500)
    course = models.ForeignKey(MyOnlineCourse, on_delete=models.CASCADE, related_name='skills')

class MyOnlineRequirement(models.Model): # Class Ex ING2, ING1
    description = models.CharField(max_length=500)
    course = models.ForeignKey(MyOnlineCourse, on_delete=models.CASCADE, related_name='requirements')

class MyOnlineSection(models.Model): # Class Ex ING2, ING1
    title = models.CharField(max_length=500)
    course = models.ForeignKey(MyOnlineCourse, on_delete=models.CASCADE, related_name='sections')
    # USER
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(auto_now_add=True)

class MyOnlineSessionOrQuiz(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()
    type = models.CharField(
        choices=(('session', 'Session'), ('quiz', 'quiz'),),
        default='session',
        max_length=7,
        verbose_name=_('Status')
    )
    section = models.ForeignKey(MyOnlineSection, on_delete=models.CASCADE, related_name='session_or_quizs')
    # USER
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

"""
class User(AbstractUser):
    online_taken_session_or_quizs = models.ManyToManyField(MyOnlineSessionOrQuiz, through='MyTakenSessionOrQuiz')
    online_courses = models.ManyToManyField(MyOnlineCourse, related_name='enrolled_students')

    def get_unanswered_questions(self, quiz):
        answered_questions = self.quiz_answers \
            .filter(my_online_response__question__quiz=quiz) \
            .values_list('answer__question__pk', flat=True)
        questions = quiz.questions.exclude(pk__in=answered_questions).order_by('text')
        return questions
"""

class MyTakenOnlineSessionOrQuiz(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='taken_session_or_quizs')
    session_or_quiz = models.ForeignKey(MyOnlineSessionOrQuiz, on_delete=models.CASCADE, related_name='taken_session_or_quizs')
    date = models.DateTimeField(auto_now_add=True)
    score = models.FloatField()

class MyOnlineSessionRessource(models.Model):
    description = models.TextField()
    link = models.URLField()
    session = models.ForeignKey(MyOnlineSessionOrQuiz, on_delete=models.CASCADE, related_name='ressources')

class MyOnlineSessionTrack(models.Model):
    srclang = models.TextField()
    link = models.URLField()
    ressource = models.ForeignKey(MyOnlineSessionRessource, on_delete=models.CASCADE, related_name='tracks')

class MyOnlineQuizQuestion(models.Model):
    quiz = models.ForeignKey(MyOnlineSessionOrQuiz, on_delete=models.CASCADE, related_name='questions')
    type = models.CharField(
        choices=(('singlechoice', 'Single choice'), ('multichoices', 'Multi choices'),('code', 'Code'), ('text', 'Text or number response'),),
        default='singlechoice',
        max_length=12,
        verbose_name=_('Type')
    )
    question = models.CharField('Question', max_length=255)
    point = models.FloatField(max_length=5)
    # USER
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text

class MyOnlineResponse(models.Model):
    question = models.ForeignKey(MyOnlineQuizQuestion, on_delete=models.CASCADE, related_name='responses')
    response = models.CharField('Answer', max_length=255)
    is_right = models.BooleanField('Correct answer', default=False)
    note = models.TextField()
    # USER
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.response

"""
class MyStudent(MyPartner):
    online_taken_session_or_quizs = models.ManyToManyField(MyOnlineSessionOrQuiz, through='MyTakenSessionOrQuiz')
    online_courses = models.ManyToManyField(MyOnlineCourse, related_name='enrolled_students')

    def get_unanswered_questions(self, quiz):
        answered_questions = self.quiz_answers \
            .filter(my_online_response__question__quiz=quiz) \
            .values_list('answer__question__pk', flat=True)
        questions = quiz.questions.exclude(pk__in=answered_questions).order_by('text')
        return questions

    def __str__(self):
        return self.user.username
"""

class MyOnlineStudentAnswer(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_answers')
    answer = models.ForeignKey(MyOnlineResponse, on_delete=models.CASCADE, related_name='+')

# CLASSROOM OK

class MyClassroom(models.Model):
    name = models.CharField(verbose_name=_('Name'), max_length=16)
    code = models.CharField(verbose_name=_('Code'), max_length=4)
    # courses = models.ManyToManyField(MyCourse, verbose_name=_('Course'), on_delete=models.CASCADE, related_name='classrooms')
    capacity = models.PositiveIntegerField(verbose_name=_('Capacity'))
    is_examroom = models.BooleanField(default=False)
    # USER
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='my_online_courses')
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(auto_now_add=True)


class MyAsset(models.Model):
    classroom = models.ForeignKey(MyClassroom, verbose_name=_('Asset'), on_delete=models.CASCADE, related_name='asset_lines')
    code = models.CharField(verbose_name=_('Code'), max_length=256)
    # product  = models.ForeignKey('product.product', 'Product')
    # product_uom_qty = models.FloatField('Quantity')
    # USER
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='my_online_courses')
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(auto_now_add=True)

# TIMETABLE OK
class MyPeriod(models.Model):
    name = models.CharField(verbose_name=_('Name'), max_length=16)
    hour = models.CharField(
        choices=(('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'),
         ('6', '6'), ('7', '7'), ('8', '8'), ('9', '9'), ('10', '10'),
         ('11', '11'), ('12', '12'),),
        default='8',
        max_length=2,
        verbose_name=_('Hours')
    )
    minute = models.CharField(
        choices=(('00', '00'), ('15', '15'), ('30', '30'), ('45', '45'),),
        default='00',
        max_length=2,
        verbose_name=_('Minute')
    )
    am_pm = models.CharField(
        choices=(('am', 'AM'), ('pm', 'PM'),),
        default='am',
        max_length=2,
        verbose_name=_('AM/PM')
    )
    # duration = models.FloatField(verbose_name=_('Duration'))
    # sequence = models.PositiveIntegerField(verbose_name=_('Sequence'))
    # timetable = models.ManyToManyField(MyTimetableDay, through='MyTimetableCell', related_name='+')
    
    class Meta:
        # unique_together = (("driver", "restaurant"),)
        unique_together = ("hour", "minute", "am_pm")
    
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.pk:
            self.name = "{0}:{0} {0}".format(self.hour, self.minute, self.am_pm)
        super().save(*args, **kwargs)  # Call the "real" save() method.

class MyTimetable(models.Model):
    course  = models.ForeignKey(MyCourse, related_name='+', verbose_name=_('Course'), on_delete=models.PROTECT)
    section = models.ForeignKey(MySection, related_name='+', verbose_name=_('Section'), on_delete=models.PROTECT)
    school_year = models.ForeignKey(MySchoolYear, related_name='timetables', on_delete=models.CASCADE)
        
    class Meta:
        unique_together = ("course", "section", "school_year")
    
    def __str__(self):
        return "{0} {0} Timetable".format(self.course, self.section)

class MyTimetableCell(models.Model):
    timetable = models.ForeignKey(MyTimetable, related_name='items', on_delete=models.CASCADE)
    classroom = models.ForeignKey(MyClassroom, on_delete=models.CASCADE, related_name='timetables')
    subject = models.ForeignKey(MySubject, verbose_name=_('Subject'), on_delete=models.PROTECT, related_name='+')
    teacher = models.ForeignKey(User, verbose_name=_('Responsible'), related_name='my_timetables', limit_choices_to={'user_type': 'school-teacher'}, null=True, blank=True, on_delete=models.SET_NULL)
    day = models.CharField(
        choices=(('Monday', 'Monday'), ('Tuesday', 'Tuesday'),
         ('Wednesday', 'Wednesday'), ('Thursday', 'Thursday'),
         ('Friday', 'Friday'), ('Saturday', 'Saturday'),),
        default='draft',
        max_length=9,
        verbose_name=_('Days')
    )
    start_period  = models.ForeignKey(MyPeriod, related_name='+', verbose_name=_('Start Period'), on_delete=models.PROTECT)
    end_period  = models.ForeignKey(MyPeriod, related_name='+', verbose_name=_('End Period'), null=True, blank=True, on_delete=models.PROTECT)
    duration = models.CharField(verbose_name=_('Duration'), max_length=25)

    class Meta:
        unique_together = (
            ("timetable", "classroom", "day", "start_period"),
            ("timetable", "classroom", "day", "end_period"),
            ("timetable", "classroom", "day", "start_period", "end_period"),
            ("timetable", "teacher", "day", "start_period"),
            ("timetable", "teacher", "day", "end_period"),
            ("timetable", "teacher", "day", "start_period", "end_period"),
        )
        
    def save(self, *args, **kwargs):
        if self.end_period.am_pm == 'AM' and self.start_period.am_pm == 'PM':
            raise ValidationError('End period must be higher than start period')
        elif self.end_period.am_pm == self.start_period.am_pm and int(self.end_period.hour) <= int(self.start_period.hour):
            raise ValidationError('End period must be higher than start period')
        elif self.end_period.am_pm == self.start_period.am_pm and self.end_period.hour == self.start_period.hour and int(self.end_period.minute) <= int(self.start_period.minute):
            raise ValidationError('End period must be higher than start period')
        self.duration = "{0}:{0}".format(int(self.end_period.hour) - int(self.start_period.hour), int(self.end_period.minute) - int(self.start_period.minute))
        super().save(*args, **kwargs)  # Call the "real" save() method.

# EXAM
"""
class MyExamRoom(models.Model):
    name = models.CharField(verbose_name=_('Name'), max_length=256)
    classroom  = models.ForeignKey(MyClassroom, verbose_name=_('Classroom'), on_delete=models.CASCADE, related_name='exam_rooms')
    courses = models.ManyToManyField(MyCourse, related_name='exam_rooms', verbose_name=_('Course(s)'))
    students = models.ManyToManyField(User, related_name='exam_rooms', verbose_name=_('Student(s)'), limit_choices_to={'user_type': 'student'}) # TO-DO: filter MyPartner on type 'student'
"""
class MyExamSession(models.Model):
    name = models.CharField(verbose_name=_('Exam'), max_length=256)
    course = models.ForeignKey(MyCourse, verbose_name=_('Course'), on_delete=models.CASCADE, related_name='exam_sessions')
    # section = models.ForeignKey(MyCourseSection, related_name='+', verbose_name=_('Section'), on_delete=models.PROTECT)
    sections = models.ManyToManyField(MySection, verbose_name=_('Concerned Sections'), limit_choices_to={'course': 'self.course'})
    exam_code = models.CharField(verbose_name=_('Exam Code'), max_length=8)
    # start_date = models.DateTimeField(verbose_name=_('Start Date'), default=timezone.now)
    # end_date = models.DateTimeField(verbose_name=_('End Date'))
    # room = models.ForeignKey(MyExamRoom, verbose_name=_('Room'), on_delete=models.CASCADE, related_name='exam_sessions')
    # exam s = fields.One2many(MyExam, 'session ', 'Exam(s)')
    state = models.CharField(
        choices=(('draft', 'Draft'), ('schedule', 'Scheduled'), ('held', 'Held'),
         ('cancel', 'Cancelled'), ('done', 'Done'),),
        default='draft',
        max_length=8
    )

class MyExamType(models.Model):
    name = models.CharField(verbose_name=_('Name'), max_length=256)
    code = models.CharField(verbose_name=_('Code'), max_length=4)

class MyExam(models.Model):
    # course  = models.ForeignKey(MyCourse, related_name='+', verbose_name=_('Course'), on_delete=models.PROTECT)
    subject = models.ForeignKey(MySubject, on_delete=models.PROTECT, related_name='exams')
    room = models.ForeignKey(MyClassroom, on_delete=models.SET_NULL, related_name='+', limit_choices_to={'is_examroom': True})
    exam_code = models.CharField('Exam Code', max_length=8)
    exam_type = models.ForeignKey(MyExamType, on_delete=models.PROTECT, related_name='exams')
    date = models.DateTimeField(verbose_name=_('Date'), default=timezone.now)
    #end_date = models.DateTimeField(verbose_name=_('End Date'))
    start_period  = models.ForeignKey(MyPeriod, related_name='+', verbose_name=_('Start Period'), on_delete=models.PROTECT)
    end_period  = models.ForeignKey(MyPeriod, related_name='+', verbose_name=_('End Period'), null=True, blank=True, on_delete=models.PROTECT)
    responsible = models.ManyToManyField(User, verbose_name=_('Responsible'), limit_choices_to=Q(user_type='school-teacher')|Q(user_type='school-staff'))
    # name = models.CharField(verbose_name=_('Exam'), max_length=256, null=True, blank=True)
    total_marks = models.FloatField(verbose_name=_('Total Marks'))
    min_marks = models.FloatField(verbose_name=_('Passing Marks'))
    note = models.TextField(verbose_name=_('Notes'),blank=True, null=True)

    class Meta:
        unique_together = (
            ("date", "room", "start_period"),
            ("date", "room", "end_period"),
            ("date", "room", "start_period", "end_period"),
        )
        
    def save(self, *args, **kwargs):
        if self.end_period.am_pm == 'AM' and self.start_period.am_pm == 'PM':
            raise ValidationError('End period must be higher than start period')
        elif self.end_period.am_pm == self.start_period.am_pm and int(self.end_period.hour) <= int(self.start_period.hour):
            raise ValidationError('End period must be higher than start period')
        elif self.end_period.am_pm == self.start_period.am_pm and self.end_period.hour == self.start_period.hour and int(self.end_period.minute) <= int(self.start_period.minute):
            raise ValidationError('End period must be higher than start period')
        super().save(*args, **kwargs)  # Call the "real" save() method.

class MyExamAttendees(models.Model):
    exam = models.ForeignKey(MyExam, verbose_name=_('Exam'), on_delete=models.PROTECT, related_name='attendees')
    student  = models.ForeignKey(User, verbose_name=_('Student'), on_delete=models.CASCADE, related_name='exams_attendees', limit_choices_to={'user_type': 'student'})
    status = models.CharField(
        choices=(('present', 'Present'), ('absent', 'Absent'),),
        default='present',
        max_length=8
    )
    # marks = models.FloatField(verbose_name=_('Marks'))
    note = models.TextField(blank=True, null=True)

class MyExamResAllocation(models.Model):
    # exam_sessions = models.ManyToManyField(MyExamSession, related_name='exams_res_allocations', verbose_name=_('Select Exam Session'))
    exams = models.ManyToManyField(MyExam, related_name='res_allocations', verbose_name=_('Exam(s)'))
    responsible = models.ManyToManyField(User, related_name='res_allocations', verbose_name=_('Responsible(s)'), limit_choices_to={'user_type': 'school-teacher'})
    students = models.ManyToManyField(User, related_name='exams_res_allocations', verbose_name=_('Student(s)'), limit_choices_to={'user_type': 'student'}) # TO-DO; filter MyPartner on type 'student'

"""
class MyMinClearCriteria(models.Model):
    name = models.CharField(verbose_name=_('Name'), max_length=256)
    number = models.FloatField(verbose_name=_('Number of Failed Subject'), max_length=5)
    result = models.CharField(verbose_name=_('Result to Display'), max_length=5)

class MyPassStatus(models.Model):
    name = models.CharField(verbose_name=_('Name'), max_length=256)
    number = models.FloatField(verbose_name=_('Minimum Percentage'), max_length=5)
    result = models.CharField(verbose_name=_('Result to Display'), max_length=5)

class MyResultTemplate(models.Model):
    exam_session = models.ForeignKey(MyExamSession, related_name='result_templates', verbose_name=_('Exam Session'), on_delete=models.CASCADE)
    name = models.CharField(verbose_name=_('Name'), max_length=256)
    result_date = models.DateTimeField(verbose_name=_('Result Date'))
    criterias = models.ManyToManyField(MyMinClearCriteria, related_name='result_templates', verbose_name=_('Minimum Qualification Criteria'))
    pass_status = models.ManyToManyField(MyPassStatus, related_name='result_templates', verbose_name=_('Pass Status'))
    

    # line_ids = fields.One2many(
    #    'op.result.template.line', 'result_id', 'Session Lines')

    ""
    def generate_result(self, user):
        marksheet_reg  = MyMarksheetRegister.objects.create(
            name='Mark Sheet for %s' % self.exam_session .name,
            exam_session=self.exam_session.id,
            generated_date=datetime.today(),
            generated_by=user,
            status='draft'
        )
        student_list = []
        for exam_session in MyResultTemplateLine.objects.get(result=self):
            total_exam = 0.0
            for exam in exam_session.result_exam_lines:
                total_exam += exam.exam.total_marks
                for attd in exam.exam.exams_attendees:
                    ret = MyResultLine.objects.create(
                        exam=exam.exam.id,
                        exam_tmpl = exam.id,
                        marks = (exam.weightage / 100) * attd.marks,
                        status = attd.marks >= exam.pass_marks and 'pass' or 'fail',
                        percentage = (100 * attd.marks) / exam.total_marks,
                        student = attd.student.id,
                        total_marks = (exam.weightage / 100) *
                        exam.total_marks
                    )
                    student_list.append([ret , attd.student, result_dict])
        
        stu_dict = {}
        for ret , stu , data in student_list:
            if stu  not in stu_dict:
                stu_dict[stu ] = []

            stu_dict[stu ].append([ret , data])
            
        for stu  in stu_dict:

            total_marks = sum([x[1]['marks'] for x in stu_dict[stu ]])
            per = (total_exam and (100 / total_exam) * total_marks) or 0.0
            result = ''
            pass_flg = True
            number_fail = 0
            for x in stu_dict[stu ]:
                if x[1]['status'] == 'fail':
                    pass_flg = False
                    number_fail += 1
            if pass_flg:

                pass_st s = self.pass_status s
                to_consider = False
                min_pass = 0.0

                for pass_st in pass_st s:
                    if pass_st.number <= per and pass_st.number > min_pass:
                        min_pass = pass_st.number
                        to_consider = pass_st

                if to_consider:
                    result = to_consider.result
            else:
                crit s = self.criteria s
                to_consider = False
                max_pass = False
                for crit  in crit s:
                    if crit .number == number_fail:
                        to_consider = crit 
                    if not max_pass or crit .number > max_pass.number:
                        max_pass = crit 
                if not to_consider:
                    to_consider = max_pass
                result = to_consider.result
            mark_line  = self.env['op.marksheet.line'].create(
                {'student ': stu ,
                 'marksheet_reg ': marksheet_reg .id,
                 'exam_session ': exam_session.id,
                 'result': result,
                 'total_marks': total_marks,
                 'total_per': per,
                 'total_exam_marks': total_exam,
                 })
            self.env['op.result.line'].browse(
                [x[0].id for x in stu_dict[stu ]]).write(
                {'result ': mark_line .id})
        return True
    ""

class MyResultTemplateLine(models.Model):

    exam_session = models.ForeignKey(MyExamSession, related_name='result_template_lines', verbose_name=_('Exam Session'), on_delete=models.CASCADE)
    detailed_report = models.BooleanField(verbose_name=_('Detailed Report'))
    result = models.ForeignKey(MyResultTemplate, related_name='result_template_lines', verbose_name=_('Result Template'), on_delete=models.CASCADE)

    @property
    def course(self):
        return self.exam_session.course
"""

class MyResultExamLine(models.Model):

    result = models.ForeignKey(MyResultTemplateLine, verbose_name=_('Session Template'), on_delete=models.CASCADE, related_name='result_exam_lines') # OK
    exam = models.ForeignKey(MyExam, verbose_name=_('Exam'), on_delete=models.CASCADE, related_name='result_exam_lines')
    # result_tmpl_line = models.ForeignKey(MyResultTemplateLine, verbose_name=_('Exam Lines'), on_delete=models.CASCADE, related_name='exam_lines')
    weightage = models.FloatField(verbose_name=_('Weightage'))


    @property
    def pass_marks(self):
        return self.exam.pass_marks

    @property
    def total_marks(self):
        return self.exam.total_marks

class MyMarksheetRegister(models.Model):

    exam_session = models.ForeignKey(MyExamSession, related_name='marksheet_registers', verbose_name=_('Exam'), on_delete=models.CASCADE)
    generated_date = models.DateTimeField(verbose_name=_('Generated Date'))
    generated_by = models.ForeignKey(User, related_name='marksheet_registers', verbose_name=_('Generated By'), on_delete=models.CASCADE)
    status = models.CharField(
        choices=(('draft', 'Draft'), ('validated', 'Validated'), ('cancelled', 'Cancelled'),),
        default='draft',
        max_length=9
    )
    total_pass = models.FloatField('Total Pass')
    total_failed = models.FloatField(verbose_name=_('Total Fail'))
    name = models.CharField(verbose_name=_('Marksheet Register'), max_length=256)


class MyMarksheetLine(models.Model):

    marksheet_reg = models.ForeignKey(MyMarksheetRegister, related_name='marksheet_lines', verbose_name=_('Marksheet Register'), on_delete=models.CASCADE)
    exam_session = models.ForeignKey(MyResultTemplateLine, related_name='marksheet_lines', verbose_name=_('Session Template'), on_delete=models.CASCADE)
    student = models.ForeignKey(User, related_name='marksheet_lines', verbose_name=_('Student'), on_delete=models.CASCADE, limit_choices_to={'user_type': 'student'})
    total_marks = models.FloatField(verbose_name=_('Total Marks'))
    total_per = models.FloatField(verbose_name=_('Total Percentage'))
    result = models.CharField(verbose_name=_('Result'), max_length=256)


class MyResultLine(models.Model):

    marksheet_line  = models.ForeignKey(MyMarksheetLine, verbose_name=_('Marksheet Line'), on_delete=models.CASCADE, related_name='result_lines')
    
    exam  = models.ForeignKey(MyExam, verbose_name=_('Marksheet Line'), on_delete=models.CASCADE, related_name='result_lines')
    exam_tmpl  = models.ForeignKey(MyResultExamLine, verbose_name=_('Exam Template'), on_delete=models.CASCADE, related_name='tmpl_result_lines')
    marks = models.FloatField(verbose_name=_('Marks'))
    percentage = models.FloatField(verbose_name=_('Percentage'))
    student = models.ForeignKey(User, related_name='result_lines', verbose_name=_('Student'), on_delete=models.CASCADE, limit_choices_to={'user_type': 'student'})
    status = models.CharField(
        choices=(('pass', 'Pass'), ('fail', 'Fail'),),
        default='pass',
        max_length=4
    )
    result = models.ForeignKey(MyMarksheetLine, related_name='m_result_lines', verbose_name=_('Marksheet Line'), on_delete=models.CASCADE)
    total_marks = models.FloatField(verbose_name=_('Percentage'))


# ADMISSION
class MyAdmissionRegister(models.Model):

    name = models.CharField(verbose_name=_('Name'), max_length=256)
    start_date = models.DateTimeField(verbose_name=_('Start Date'), default=timezone.now)
    end_date = models.DateTimeField(verbose_name=_('End Date'))
    course = models.ForeignKey(MyCourse, verbose_name=_('Course'), on_delete=models.CASCADE, related_name='admission_registers')
    min_count = models.PositiveIntegerField(verbose_name=_('Minimum No. of Admission'))
    max_count = models.PositiveIntegerField(verbose_name=_('Maximum No. of Admission'), default=30)

    # product  = models.ForeignKey(
    #    'product.product', 'Product',
    #    domain=[('type', '=', 'service')], editable=False,
    #    states={'draft': [('readonly', False)]}, track_visibility='onchange')

    # admission s = fields.One2many('op.admission', 'register ', 'Admissions')

    status = models.CharField(
        choices=(('draft', 'Draft'), ('confirm', 'Confirmed'),
         ('cancel', 'Cancelled'), ('application', 'Application Gathering'),
         ('admission', 'Admission Process'), ('done', 'Done'),),
        default='draft',
        max_length=11,
        verbose_name=_('Status')
    )

class MyAdmission(models.Model):

    name = models.CharField(max_length=128)
    middle_name = models.CharField(verbose_name=_('Middle Name'), max_length=128)
    last_name = models.CharField(verbose_name=_('Last Name'), max_length=128)
    
    # title = models.ForeignKey('res.partner.title', 'Title', states={'done': [('readonly', True)]})
    
    # application_number = models.CharField(verbose_name=_('Application Number'), max_length=16, default=lambda self: MySequence.next_by_code('MyAdmission'))
    admission_date = models.DateTimeField(verbose_name=_('Admission Date'))
    application_date = models.DateTimeField(verbose_name=_('Application Date'), default=timezone.now)
    birth_date = models.DateTimeField('Birth Date')
    course  = models.ForeignKey(MyCourse, verbose_name=_('Course'), on_delete=models.CASCADE, related_name='admission_lines')
    batch  = models.ForeignKey(MyBatch, verbose_name=_('Batch'), on_delete=models.CASCADE, related_name='admission_lines')
    street = models.CharField(verbose_name=_('Street'), max_length=256)
    street2 = models.CharField(verbose_name=_('Street2'), max_length=256)
    phone = models.CharField('Phone', max_length=16)
    mobile = models.CharField('Mobile', max_length=16)
    # email = models.CharField('Email', max_length=256)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
    )
    city = models.CharField(verbose_name=_('City'), max_length=64)
    zip = models.CharField(verbose_name=_('Zip'), max_length=8)
    # state  = models.ForeignKey(MyState, verbose_name=_('State'), on_delete=models.CASCADE, related_name='admission_lines')
    # country  = models.ForeignKey(MyCountry, verbose_name=_('Country'), on_delete=models.CASCADE, related_name='admission_lines')
    fees = models.FloatField(verbose_name=_('Fees'))
    photo = models.BinaryField('Photo')
    status = models.CharField(
        choices=(('draft', 'Draft'), ('confirm', 'Confirmed'),
         ('payment_process', 'Payment Process'), ('fees_paid', 'Fees Paid'),
         ('reject', 'Rejected'), ('pending', 'Pending'),
         ('cancel', 'Cancelled'), ('done', 'Done'),),
        default='draft',
        max_length=15,
        verbose_name=_('Status')
    )
    due_date = models.DateTimeField(verbose_name=_('Due Date'))
    prev_institute  = models.CharField(verbose_name=_('Previous Institute'), max_length=256)
    prev_course  = models.ForeignKey(MyCourse, verbose_name=_('Previous Course'), on_delete=models.CASCADE, related_name='prev_admission_lines')
    prev_result = models.CharField(verbose_name=_('Previous Result'), max_length=256)
    family_business = models.CharField(verbose_name=_('Family Business'), max_length=256)
    family_income = models.FloatField(verbose_name=_('Family Income'))
    gender = models.CharField(
        choices=(('male', 'Male'), ('female', 'Female'),),
        max_length=6,
        verbose_name=_('Gender')
    )
    student = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL, related_name='admission_lines', limit_choices_to={'user_type': 'student'})
    nbr = models.PositiveIntegerField(verbose_name=_('No of Admission'), editable=False)
    register  = models.ForeignKey(MyAdmissionRegister, verbose_name=_('Admission Register'), on_delete=models.CASCADE, related_name='admission_lines')
    # partner  = models.ForeignKey(User, verbose_name=_('Partner'), on_delete=models.CASCADE, related_name='admission_lines')


# SCHOLARSHIP

class MyScholarshipType(models.Model):
    name = models.CharField(verbose_name=_('Name'), max_length=64)
    amount = models.IntegerField(verbose_name=_('Amount'))


class MyScholarship(models.Model):
    name = models.CharField(verbose_name=_('Name'), max_length=64)
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='scholarship_lines', limit_choices_to={'user_type': 'student'})
    type = models.ForeignKey(MyScholarshipType, on_delete=models.CASCADE, related_name='scholarship_lines')
    status = models.CharField(
        choices=(('draft', 'Draft'), ('confirm', 'Confirm'),
         ('reject', 'Reject'),),
        default='draft',
        max_length=7,
        verbose_name=_('Status')
    )


# FACILITY

class MyFacility(models.Model):
    name = models.CharField(verbose_name=_('Name'), max_length=16)
    code = models.CharField(verbose_name=_('Code'), max_length=4)


class MyFacilityLine(models.Model):
    facility = models.ForeignKey(MyFacility, verbose_name=_('Facility'), on_delete=models.CASCADE, related_name='facility_lines')
    quantity = models.FloatField(verbose_name=_('Quantity'))
    classroom = models.ForeignKey(MyClassroom, verbose_name=_('Classroom'), on_delete=models.CASCADE, related_name='facility_lines')


# FEES


# ACTIVITY

class MyActivityType(models.Model):
    name = models.CharField(verbose_name=_('Name'), max_length=128)

class MyActivity(models.Model):
    student = models.ForeignKey(User, verbose_name=_('Student'), on_delete=models.CASCADE, related_name='activity_lines', limit_choices_to={'user_type': 'student'})
    responsible = models.ManyToManyField(User, verbose_name=_('Responsible'), related_name='responsible_for_activity_lines', limit_choices_to={'user_type': 'instructor'})
    type = models.ForeignKey(MyActivityType, verbose_name=_('Activity Type'), on_delete=models.CASCADE, related_name='activity_lines')
    description = models.TextField(null=True, blank=True)
    date = models.DateTimeField(verbose_name=_('Date'))

# ASSIGNEMENTS

class MyAssignmentType(models.Model):
    name = models.CharField(verbose_name=_('Name'), max_length=256)
    code = models.CharField('Code', max_length=4)


class MyAssignment(models.Model):
    name = models.CharField(verbose_name=_('Name'), max_length=16)
    course  = models.ForeignKey(MyCourse, verbose_name=_('Course'), on_delete=models.CASCADE, related_name='assignment_lines')
    # batch  = models.ForeignKey(MyBatch, verbose_name=_('Batch'), on_delete=models.CASCADE, related_name='assignment_lines')
    subject  = models.ForeignKey(MySubject, verbose_name=_('Subject'), on_delete=models.CASCADE, related_name='subject_assignment_lines')
    responsible = models.ForeignKey(User, verbose_name=_('Responsible'), related_name='r_assignment_lines', null=True, blank='', on_delete=models.SET_NULL, limit_choices_to=Q(user_type='k4')|Q(user_type='k4'))
    assignment_type = models.ForeignKey(MyAssignmentType, verbose_name=_('Assignment Type'), null=True, blank=True, related_name='assignment_lines', on_delete=models.SET_NULL)
    marks = models.FloatField(verbose_name=_('Marks'))
    description = models.TextField('Description')
    status = models.CharField(
        choices=(('draft', 'Draft'), ('publish', 'Published'),
         ('finish', 'Finished'),),
        default='draft',
        max_length=7,
        verbose_name=_('Status')
    )
    issued_date = models.DateTimeField(verbose_name=_('Issued Date'), default=timezone.now)
    submission_date = models.DateTimeField(verbose_name=_('Submission Date'))
    allocated_to = models.ManyToManyField(User, verbose_name=_('Allocated To'), related_name='s_assignment_lines', limit_choices_to={'user_type': 'student'})
    reviewer = models.ForeignKey(User, verbose_name=_('Reviewer'), related_name='reviewer_assignment_lines', limit_choices_to={'user_type': 'instructor'}, on_delete=models.CASCADE)


class MyAssignmentSubLine(models.Model):
    assignment = models.ForeignKey(MyAssignment, verbose_name=_('Assignment'), on_delete=models.CASCADE, related_name='assignment_sub_lines')
    student = models.ForeignKey(User, verbose_name=_('Student'), on_delete=models.CASCADE, related_name='assignment_sub_lines', limit_choices_to={'user_type': 'student'})
    description = models.TextField('Description')
    status = models.CharField(
        choices=(('draft', 'Draft'), ('submit', 'Submitted'), ('reject', 'Rejected'),
         ('change', 'Change Req.'), ('accept', 'Accepted'),),
        default='draft',
        max_length=7,
        verbose_name=_('Status')
    )
    submission_date = models.DateTimeField(verbose_name=_('Submission Date'), default=timezone.now, editable=False)
    note = models.TextField(verbose_name=_('Note'), null=True, blank=True)


# ATTENDANCES
"""

class OpAttendanceSheet(models.Model):
    _name = 'op.attendance.sheet'

    @api.one
    @api.depends('attendance_line.present')
    def _total_present(self):
        self.total_present = len(self.attendance_line.filtered(
            lambda self: self.present))

    @api.one
    @api.depends('attendance_line.present')
    def _total_absent(self):
        self.total_absent = len(self.attendance_line.filtered(
            lambda self: self.present is False))

    name = models.CharField('Name', max_length=8)
    register  = models.ForeignKey(
        'op.attendance.register', 'Register')
    attendance_date = models.DateTimeField(
        'Date', default=lambda self: models.DateTimeField.today())
    attendance_line = fields.One2many(
        'op.attendance.line', 'attendance ', 'Attendance Line')
    total_present = models.PositiveIntegerField(
        'Total Present', compute='_total_present')
    total_absent = models.PositiveIntegerField(
        'Total Absent', compute='_total_absent')
    faculty  = models.ForeignKey('op.faculty', 'Faculty')

class OpAttendanceRegister(models.Model):
    _name = 'op.attendance.register'

    name = models.CharField('Name', max_length=16)
    code = models.CharField('Code', max_length=8)
    course  = models.ForeignKey('op.course', 'Course')
    batch  = models.ForeignKey('op.batch', 'Batch')
    subject  = models.ForeignKey('op.subject', 'Subject')

class OpAttendanceLine(models.Model):
    _name = 'op.attendance.line'
    _rec_name = 'attendance '

    attendance  = models.ForeignKey(
        'op.attendance.sheet', 'Attendance')
    student  = models.ForeignKey('op.student', 'Student')
    present = models.BooleanField('Present ?', default=True)
    course  = models.ForeignKey(
        'op.course', 'Course', related='student .course ', store=True,
        editable=False)
    batch  = models.ForeignKey(
        'op.batch', 'Batch', related='student .batch ', store=True,
        editable=False)
    remark = models.CharField('Remark', max_length=256)
    attendance_date = models.DateTimeField(
        'Date', related='attendance .attendance_date', store=True,
        editable=False)

# ACHEIVEMENT

class OpAchievement(models.Model):
    _name = 'op.achievement'
    _rec_name = 'student '

    student  = models.ForeignKey('op.student', 'Student')
    faculty  = models.ForeignKey('op.faculty', 'Faculty')
    achievement_type = models.ForeignKey(
        'op.achievement.type', 'Achievement Type')
    description = models.TextField('Description')
    achievement_date = models.DateTimeField(
        'Date', default=models.DateTimeField.today())


class OpAchievementType(models.Model):
    _name = 'op.achievement.type'

    name = models.CharField('Name', max_length=256)
    code = models.CharField('Code', max_length=4)

# ALUMNI

class OpAlumni(models.Model):

    _inherit = 'op.student'

    alumni_boolean = models.BooleanField('Alumni Student')
    passing_year = models.ForeignKey('op.batch', 'Passing Year')
    current_position = models.CharField('Current Position', max_length=256)
    current_job = models.CharField('Current Job', max_length=256)

# PLACEMENT

class OpPlacementOffer(models.Model):
    _name = 'op.placement.offer'
    _inherit = 'mail.thread'
    _description = 'Placement Offer'

    name = models.CharField('Company Name')
    student  = models.ForeignKey('op.student', 'Student Name')
    join_date = models.DateTimeField('Join Date', default=models.DateTimeField.today())
    offer_package = models.CharField('Offered Package', max_length=256)
    training_period = models.CharField('Training Period', max_length=256)
    state = fields.Selection(
        [('draft', 'Draft'), ('offer', 'Offer'), ('join', 'Join'),
         ('reject', 'Rejected'), ('cancel', 'Cancel')], 'State',
        default='draft', track_visibility='onchange')


# PARENTS

class OpParent(models.Model):
    _name = 'op.parent'

    name = models.ForeignKey('res.partner', 'Name')
    student s = fields.Many2many('op.student', verbose_name=_('Student(s)')
    user  = models.ForeignKey('res.users', 'User')


class OpStudent(models.Model):

    _inherit = 'op.student'

    parent s = fields.Many2many('op.parent', verbose_name=_('Parent')


class ResUsers(models.Model):
    _inherit = "res.users"

    parent s = fields.One2many('op.parent', 'user ', 'Parents')

# FROM DJANGO SCHOOL

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.html import escape, mark_safe


class User(AbstractUser):
    is_student = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    is_hr_manager = models.BooleanField(default=False)
    is_financial_manager = models.BooleanField(default=False)
    is_owner = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_super_admin = models.BooleanField(default=False)
"""


