echo 'Install python modules'
pip3 install -r requirements.txt --trusted-host pypi.python.org
echo 'Done...'

echo 'Collect static'
python manage.py collectstatic --noinput
echo 'Done...'

export PORT=8000
echo 'Server runnning on port ' $PORT
python3.6 manage.py runserver
