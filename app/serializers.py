import itertools
from app.models import Table, Column, Row, Cell
from app.models import MyOnlineCourse, MyOnlineSection, MyOnlineSessionOrQuiz, MyOnlineSessionRessource, MyOnlineSessionTrack, MyOnlineQuizQuestion, MyOnlineResponse
from rest_framework import serializers

class MyOnlineResponseSerializer(serializers.ModelSerializer):
    id = serializers.ModelField(model_field=MyOnlineResponse._meta.get_field('id'), required=False)
    
    class Meta:
        model = MyOnlineResponse
        fields = ('id', 'response', 'is_right', 'note')

class MyOnlineSessionRessourceSerializer(serializers.ModelSerializer):
    id = serializers.ModelField(model_field=MyOnlineSessionRessource._meta.get_field('id'), required=False)
    
    class Meta:
        model = MyOnlineSessionRessource
        fields = ('id', 'description', 'link')

class MyOnlineSessionTrackSerializer(serializers.ModelSerializer):
    id = serializers.ModelField(model_field=MyOnlineSessionTrack._meta.get_field('id'), required=False)
    
    class Meta:
        model = MyOnlineSessionTrack
        fields = ('id', 'srclang', 'link')

class MyOnlineQuizQuestionSerializer(serializers.ModelSerializer):
    responses = MyOnlineResponseSerializer(many=True)
    
    class Meta:
        model = MyOnlineQuizQuestion
        # fields = ('id','name', 'description','columns','rows')
        fields = ('id', 'type', 'question', 'point','responses')

    def create(self, validated_data):
        responses_data = validated_data.pop('responses')
        # rows_data = validated_data.pop('rows')
        question = MyOnlineQuizQuestion.objects.create(**validated_data)
        for resp_data in responses_data:
            MyOnlineResponse.objects.create(question=question, **resp_data)
        # for row_data in rows_data:
        #    Row.objects.create(table=table, **row_data)
        return question

    def update(self, instance, validated_data):
    
        not_to_delete = [] # Rows and Columns Not to delete

        responses_data = validated_data.pop('responses')
        responses = instance.responses.all()
        
        # rows_data = validated_data.pop('rows')
        # rows = instance.rows.all()
        
        # for field in validated_data:
        #    instance.__setattr__(field, validated_data.get(field))
        
        instance.type = validated_data.get('type', instance.type)
        instance.question = validated_data.get('question', instance.question)
        instance.point = validated_data.get('point', instance.point)
        instance.save()
        
        for resp_data in responses_data:
            if responses:
                resp = [x for x in responses if x.id == resp_data.get('id')]
                if len(resp) > 0:
                    response = MyOnlineResponse.objects.get(id=resp[0].id)
                    for field in col_data:
                        response.__setattr__(field, resp_data.get(field))
                    response.question = instance
                    response.save()
                    not_to_delete.append(resp[0].id)
                else:
                    MyOnlineResponse.objects.create(question = instance, **resp_data)
            else:
                MyOnlineResponse.objects.create(question = instance, **resp_data)
    
        if responses: # delete old columns
            for resp in responses:
                if resp.id not in not_to_delete:
                    MyOnlineResponse.objects.filter(id=resp.id).delete()

        return instance

class MyOnlineSessionOrQuizSerializer(serializers.ModelSerializer):
    ressources = MyOnlineSessionRessourceSerializer(many=True)
    tracks = MyOnlineSessionTrackSerializer(many=True)
    questions = MyOnlineQuizQuestionSerializer(many=True)
    
    class Meta:
        model = MyOnlineSessionOrQuiz
        fields = ('id', 'type', 'name', 'description','ressources','tracks','questions','course')

    def create(self, validated_data):
        ressources_data = validated_data.pop('ressources')
        tracks_data = validated_data.pop('tracks')
        questions_data = validated_data.pop('questions')

        # Retrouver la course en cours
        course_id_data = validated_data.pop('course')
        course = MyOnlineCourse.objects.get(id=course_id_data)

        session_or_quiz = MyOnlineSessionOrQuiz.objects.create(course=course, **validated_data)

        for res_data in ressources_data:
            MyOnlineSessionRessource.objects.create(session=session_or_quiz, **res_data)
        for track_data in tracks_data:
            MyOnlineSessionTrack.objects.create(session=session_or_quiz, **track_data)
        for quest_data in questions_data:
            MyOnlineQuizQuestion.objects.create(quiz=session_or_quiz, **quest_data)

        return session_or_quiz

    def update(self, instance, validated_data):
        ressources_data = validated_data.pop('ressources')
        ressources = instance.ressources.all()
        
        tracks_data = validated_data.pop('tracks')
        tracks = instance.tracks.all()
        
        questions_data = validated_data.pop('questions')
        questions = instance.questions.all()
        
        instance.type = validated_data.get('type', instance.type)
        instance.name = validated_data.get('name', instance.question)
        instance.description = validated_data.get('description', instance.point)
        instance.save()
        
        not_to_delete = []
        for res_data in ressources_data:
            if ressources:
                res = [x for x in ressources if x.id == res_data.get('id')]
                if len(res) > 0:
                    ressource = MyOnlineSessionRessource.objects.get(id=res[0].id)
                    for field in res_data:
                        ressource.__setattr__(field, res_data.get(field))
                    ressource.session = instance
                    ressource.save()
                    not_to_delete.append(res[0].id)
                else:
                    MyOnlineSessionRessource.objects.create(session = instance, **res_data)
            else:
                MyOnlineSessionRessource.objects.create(session = instance, **res_data)
        if ressources: # delete old columns
            for res in ressources:
                if res.id not in not_to_delete:
                    MyOnlineSessionRessource.objects.filter(id=res.id).delete()

        not_to_delete = []
        for track_data in tracks_data:
            if tracks:
                trac = [x for x in tracks if x.id == track_data.get('id')]
                if len(trac) > 0:
                    track = MyOnlineSessionTrack.objects.get(id=trac[0].id)
                    for field in track_data:
                        track.__setattr__(field, track_data.get(field))
                    track.session = instance
                    track.save()
                    not_to_delete.append(trac[0].id)
                else:
                    MyOnlineSessionTrack.objects.create(session = instance, **track_data)
            else:
                MyOnlineSessionTrack.objects.create(session = instance, **track_data)
        if tracks: # delete old columns
            for res in tracks:
                if res.id not in not_to_delete:
                    MyOnlineSessionTrack.objects.filter(id=res.id).delete()

        not_to_delete = []
        for quest_data in questions_data:
            if questions:
                quest = [x for x in tracks if x.id == quest_data.get('id')]
                if len(quest) > 0:
                    question = MyOnlineQuizQuestion.objects.get(id=quest[0].id)
                    for field in quest_data:
                        track.__setattr__(field, quest_data.get(field))
                    question.quiz = instance
                    question.save()
                    not_to_delete.append(quest[0].id)
                else:
                    MyOnlineQuizQuestion.objects.create(quiz = instance, **quest_data)
            else:
                MyOnlineQuizQuestion.objects.create(quiz = instance, **quest_data)
        if questions:
            for res in questions:
                if res.id not in not_to_delete:
                    MyOnlineQuizQuestion.objects.filter(id=res.id).delete()

        return instance

class MyOnlineSectionSerializer(serializers.ModelSerializer):
    session_or_quizs = MyOnlineSessionOrQuizSerializer(many=True)
    
    class Meta:
        model = MyOnlineSection
        fields = ('id', 'name', 'description', 'is_free','price', 'status', 'session_or_quizs')

    def create(self, validated_data):
        session_or_quizs_data = validated_data.pop('session_or_quizs')
        section = MyOnlineSection.objects.create(**validated_data)
        # for ses_data in session_or_quizs_data:
        #     MyOnlineSessionOrQuiz.objects.create(course=course, **ses_data)
        return section

    def update(self, instance, validated_data):
        not_to_delete = [] # Rows and Columns Not to delete

        session_or_quizs_data = validated_data.pop('session_or_quizs')
        session_or_quizs = instance.session_or_quizs.all()
        
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        
        """
        les session_or_quizs seront geres dans leurs serializers
        for ses_data in session_or_quizs_data:
            if session_or_quizs:
                ses = [x for x in session_or_quizs if x.id == ses_data.get('id')]
                if len(ses) > 0:
                    session_or_quiz = MyOnlineSessionOrQuiz.objects.get(id=ses[0].id)
                    for field in ses_data:
                        session_or_quiz.__setattr__(field, ses_data.get(field))
                    session_or_quiz.course = instance
                    session_or_quiz.save()
                    not_to_delete.append(ses[0].id)
                else:
                    MyOnlineSessionOrQuiz.objects.create(course = instance, **ses_data)
            else:
                MyOnlineSessionOrQuiz.objects.create(course = instance, **ses_data)
    
        if session_or_quizs: # delete old columns
            for resp in session_or_quizs:
                if resp.id not in not_to_delete:
                    MyOnlineSessionOrQuiz.objects.filter(id=resp.id).delete()
        """
        
        return instance

class MyOnlineCourseSerializer(serializers.ModelSerializer):
    sections = MyOnlineSectionSerializer(many=True)
    
    class Meta:
        model = MyOnlineCourse
        fields = ('id', 'name', 'description', 'is_free','price', 'status', 'sections')

    def create(self, validated_data):
        sections_data = validated_data.pop('sections')
        course = MyOnlineCourse.objects.create(**validated_data)
        # for ses_data in session_or_quizs_data:
        #     MyOnlineSessionOrQuiz.objects.create(course=course, **ses_data)
        return course

    def update(self, instance, validated_data):
        not_to_delete = [] # Rows and Columns Not to delete

        sections_data = validated_data.pop('sections')
        sections = instance.sections.all()
        
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.is_free = validated_data.get('is_free', instance.is_free)
        instance.price = validated_data.get('price', instance.price)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance

class ColumnSerializer(serializers.ModelSerializer):

    id = serializers.ModelField(model_field=Column._meta.get_field('id'), required=False)
    
    class Meta:
        model = Column
        fields = ('id', 'name', 'label', 'type', 'options', 'nullable')


class CellSerializer(serializers.ModelSerializer):

    id = serializers.ModelField(model_field=Cell._meta.get_field('id'), required=False)
    
    class Meta:
        model = Cell
        fields = ('id', 'column', 'value')

class RowSerializer(serializers.ModelSerializer):
    cells = CellSerializer(many=True)

    class Meta:
        model = Row
        fields = ('cells')


class TableColumnsSerializer(serializers.ModelSerializer):
    columns = ColumnSerializer(many=True)
    
    # rowset = Row.objects.all()
    # rows = RowSerializer(rowset, many=True)
    # rows = RowSerializer(many=True)

    class Meta:
        model = Table
        # fields = ('id','name', 'description','columns','rows')
        fields = ('id','name', 'description','columns')

    def create(self, validated_data):
        columns_data = validated_data.pop('columns')
        # rows_data = validated_data.pop('rows')
        table = Table.objects.create(**validated_data)
        for col_data in columns_data:
            Column.objects.create(table=table, **col_data)
        # for row_data in rows_data:
        #    Row.objects.create(table=table, **row_data)
        return table

    def update(self, instance, validated_data):
    
        not_to_delete = [] # Rows and Columns Not to delete

        columns_data = validated_data.pop('columns')
        columns = instance.columns.all()
        
        # rows_data = validated_data.pop('rows')
        # rows = instance.rows.all()
        
        # for field in validated_data:
        #    instance.__setattr__(field, validated_data.get(field))
        
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        
        for col_data in columns_data:
            if columns:
                col = [x for x in columns if x.id == col_data.get('id')]
                if len(col) > 0:
                    column = Column.objects.get(id=col[0].id)
                    for field in col_data:
                        column.__setattr__(field, col_data.get(field))
                    column.table = instance
                    column.save()
                    not_to_delete.append(col[0].id)
                else:
                    Column.objects.create(table = instance, **col_data)
            else:
                Column.objects.create(table = instance, **col_data)
    
        if columns: # delete old columns
            for col in columns:
                if col.id not in not_to_delete:
                    Column.objects.filter(id=col.id).delete()
        """
        not_to_delete = []
        
        for row_data in rows_data:
            if rows:
                ro = [x for x in rows if x.id == row_data.get('id')]
                if len(ro) > 0:
                    row = Rows.objects.get(id=ro[0].id)
                    for field in row_data:
                        row.__setattr__(field, row_data.get(field))
                    row.table = instance
                    row.save()
                    not_to_delete.append(ro[0].id)
                else:
                    Row.objects.create(table = instance, **row_data)
            else:
                Row.objects.create(table = instance, **row_data)
    
        if rows: # delete old columns
            for ro in rows:
                if ro.id not in not_to_delete:
                    Row.objects.filter(id=ro.id).delete()
        """

        return instance

