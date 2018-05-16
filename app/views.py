import json
from django.http import HttpResponse, JsonResponse, Http404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login

from app.models import Table
from app.serializers import TableColumnsSerializer
from app.models import MyOnlineCourse, MyOnlineSection, MyOnlineSessionOrQuiz
from app.serializers import MyOnlineCourseSerializer, MyOnlineSectionSerializer, MyOnlineSessionOrQuizSerializer

"""
def connexion(request):
    error = False
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TableColumnsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

   if request.method == "POST":
        form = ConnexionForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            user = authenticate(username=username, password=password)  # Nous vérifions si les données sont correctes
            if user:  # Si l'objet renvoyé n'est pas None
                login(request, user)  # nous connectons l'utilisateur
            else: # sinon une erreur sera affichée
                error = True
    else:
        form = ConnexionForm()
    return render(request, 'connexion.html', locals())
"""

# @login_required
# @login_required(login_url='/connexion_pour_concours/')
class SessionOrQuizList(APIView):

    def get(self, request, format=None):
        session_or_quiz = MyOnlineSessionOrQuiz.objects.all()
        serializer = MyOnlineSessionOrQuizSerializer(session_or_quiz, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MyOnlineSessionOrQuizSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class SessionOrQuizDetail(APIView):
    
    def get_object(self, pk):
        try:
            return MyOnlineSessionOrQuiz.objects.get(pk=pk)
        except MyOnlineSessionOrQuiz.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        session_or_quiz = self.get_object(pk)
        serializer = MyOnlineSessionOrQuizSerializer(session_or_quiz)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        session_or_quiz = self.get_object(pk)
        serializer = MyOnlineSessionOrQuizSerializer(session_or_quiz, data=request.data)
        # raise ValueError(table.columns.first().id)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        session_or_quiz = self.get_object(pk)
        session_or_quiz.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SectionList(APIView):

    def get(self, request, format=None):
        section = MyOnlineSection.objects.all()
        serializer = MyOnlineSectionSerializer(section, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MyOnlineSectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class SectionDetail(APIView):
    
    def get_object(self, pk):
        try:
            return MyOnlineSection.objects.get(pk=pk)
        except MyOnlineSessionOrQuiz.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        section = self.get_object(pk)
        serializer = MyOnlineSectionSerializer(section)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        section = self.get_object(pk)
        serializer = MyOnlineSectionSerializer(section, data=request.data)
        # raise ValueError(table.columns.first().id)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        section = self.get_object(pk)
        section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CourseList(APIView):

    def get(self, request, format=None):
        courses = MyOnlineCourse.objects.all()
        serializer = MyOnlineCourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MyOnlineCourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class CourseDetail(APIView):
    
    def get_object(self, pk):
        try:
            return MyOnlineCourse.objects.get(pk=pk)
        except MyOnlineCourse.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = MyOnlineCourseSerializer(course)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = MyOnlineCourseSerializer(course, data=request.data)
        # raise ValueError(table.columns.first().id)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        course = self.get_object(pk)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# @csrf_exempt
def table_list(request, format=None):
    
    # List all tables, or create a new table.
    if request.method == 'GET':
        tables = Table.objects.all()
        serializer = TableColumnsSerializer(tables, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TableColumnsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)



@api_view(['GET', 'PUT', 'DELETE'])
def table_detail(self, request, pk, format=None):
    
    # Retrieve, update or delete a table.
    try:
        table = Table.objects.get(pk=pk)
    except Table.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TableColumnsSerializer(table)
        # return JsonResponse(serializer.data)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TableColumnsSerializer(table, data=request.data)
        if serializer.is_valid():
            serializer.save()
            # return JsonResponse(serializer.data)
            return Response(serializer.data)
        # return JsonResponse(serializer.errors, status=400)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        table.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TableList(APIView):

    # List all table, or create a new table.

    def get(self, request, format=None):
        tables = Table.objects.all()
        serializer = TableColumnsSerializer(tables, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TableColumnsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class TableDetail(APIView):
    # Retrieve, update or delete a snippet instance.
    
    def get_object(self, pk):
        try:
            return Table.objects.get(pk=pk)
        except Table.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        table = self.get_object(pk)
        serializer = TableColumnsSerializer(table)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        table = self.get_object(pk)
        serializer = TableColumnsSerializer(table, data=request.data)
        # raise ValueError(table.columns.first().id)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        table = self.get_object(pk)
        table.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Create your views here.
def index(request):
    return render(request, 'index.html')

def risk_view(request, id_risk):
    data2 = {
            "id": 1446412740884,
            "name": "Risks 1",
            "description": "I'm the risk 1",
            "column_collection": [
                {
                    "id": 1446416639512,
                    "type": "text",
                    "label": "text label",
                    "value": "je suis le text 1",
                    "nullable": False
                },
                {
                    "id": 1446416639513,
                    "type": "number",
                    "label": "number label",
                    "value": 98765,
                    "nullable": True
                },
                {
                    "id": 1446416639514,
                    "type": "date",
                    "label": "date label",
                    "value": "2018-02-06",
                    "nullable": False
                },
                {
                    "id": 1446416639515,
                    "type": "checkbox",
                    "label": "Checkbox Label",
                    "value": "option1:value1, option2:value2, option3:value3",
                    "nullable": True
                }
            ]
        }
    r = JsonResponse(data2)
    # r["Access-Control-Allow-Origin"] = '*'
    return r

def risks_home(request):
    # Risks = Risk.objects.all() # Nous sélectionnons tous nos articles
    # Risks = Risk.objects.values('name').annotate(column_collection=Avg(’book__rating’))
    # risk_list = [{"id": riskier.id, "name": riskier.name, "column_collection": riskier.column_collection} for riskier in Risks]
    # data = {
    #    "risk_list": risk_list
    # }
    # return render(request, 'risk/accueil.html', {'data': data})
    data = {"data":[
            {
                "id": 1446412739540,
                "name": "Risks 1",
                "description": "I'm the risk 1"
            },
            {
                "id": 1446412740881,
                "name": "Risks 2",
                "description": "I'm the risk 2"
            },
            {
                "id": 1446412740882,
                "name": "Risks 3",
                "description": "I'm the risk 3"
            },
            {
                "id": 1446412739543,
                "name": "Risks 1",
                "description": "I'm the risk 1"
            },
            {
                "id": 1446412740884,
                "name": "Risks 2",
                "description": "I'm the risk 2"
            },
            {
                "id": 1446412740885,
                "name": "Risks 3",
                "description": "I'm the risk 3"
            },
            {
                "id": 1446412739546,
                "name": "Risks 1",
                "description": "I'm the risk 1"
            },
            {
                "id": 1446412740887,
                "name": "Risks 2",
                "description": "I'm the risk 2"
            },
            {
                "id": 1446412740888,
                "name": "Risks 3",
                "description": "I'm the risk 3"
            },
            {
                "id": 1446412739549,
                "name": "Risks 1",
                "description": "I'm the risk 1"
            },
            {
                "id": 1446412740810,
                "name": "Risks 2",
                "description": "I'm the risk 2"
            },
            {
                "id": 1446412740811,
                "name": "Risks 3",
                "description": "I'm the risk 3"
            },
            {
                "id": 1446412739512,
                "name": "Risks 1",
                "description": "I'm the risk 1"
            },
            {
                "id": 1446412740813,
                "name": "Risks 2",
                "description": "I'm the risk 2"
            },
            {
                "id": 1446412740814,
                "name": "Risks 3",
                "description": "I'm the risk 3"
            }
        ]}

    return JsonResponse(data)
