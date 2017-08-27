# Bootstrap script for local development. Does the following:
# 1. Resets database
# 2. Seeds with fakes

E_USERNAME_NOT_CHANGED=60

# Change this to your username

USERNAME="gbojinov"
DATABASE="tournament"

if [[ -z "$USERNAME" ]]
then
  echo "Open `basename $0` and change the USERNAME value"
  exit "$E_USERNAME_NOT_CHANGED"
fi

dropdb --if-exists "$DATABASE"
sudo -u postgres createdb -O $USERNAME "$DATABASE"

python manage.py migrate
python manage.py seed_data
