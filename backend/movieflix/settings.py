import os
from pathlib import Path
from dotenv import load_dotenv
import dj_database_url

# ================================
# BASE DIRECTORIES
# ================================
BASE_DIR = Path(__file__).resolve().parent.parent
ROOT_DIR = BASE_DIR.parent
ENV_DIR = ROOT_DIR / "env"

# Environment type (dev or prod)
ENV_TYPE = os.getenv("ENV_TYPE", "dev").lower()
dotenv_path = ENV_DIR / f".env.{ENV_TYPE}"

if dotenv_path.exists():
    load_dotenv(dotenv_path)
else:
    raise FileNotFoundError(f"Missing environment file: {dotenv_path}")

# ================================
# CORE SETTINGS
# ================================
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "changeme-in-prod")

DEBUG = os.getenv("DEBUG", "True").lower() == "true"

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "api.fitleague.store",
    "fitleague.store",
    ".ondigitalocean.app",
]

# ================================
# APPLICATIONS
# ================================
INSTALLED_APPS = [
    # Django core
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'corsheaders',
    'rest_framework',

    # Local apps
    'movies.apps.MoviesConfig',
    'reviews.apps.ReviewsConfig',
    'accounts.apps.AccountsConfig',
]

# ================================
# MIDDLEWARE
# ================================
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",  # for static files
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = 'movieflix.urls'
WSGI_APPLICATION = 'movieflix.wsgi.application'

# ================================
# AUTHENTICATION
# ================================
AUTH_USER_MODEL = 'accounts.CustomUser'

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]

# ================================
# REST FRAMEWORK
# ================================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
}

# ================================
# DATABASE
# ================================
DATABASES = { 
             "default": 
                 { "ENGINE": "django.db.backends.postgresql",
                  "NAME": os.getenv("DATABASE_NAME"),
                  "USER": os.getenv("DATABASE_USER"),
                  "PASSWORD": os.getenv("DATABASE_PASSWORD"),
                  "HOST": os.getenv("DATABASE_HOST", "localhost"),
                  "PORT": os.getenv("DATABASE_PORT", "5432"),
                  } 
                 }

# ================================
# PASSWORD VALIDATORS
# ================================
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ================================
# INTERNATIONALIZATION
# ================================
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Nairobi'
USE_I18N = True
USE_TZ = True

# ================================
# STATIC & MEDIA FILES
# ================================
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ================================
# CORS & CSRF SETTINGS
# ================================
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",                # Local React dev
    "https://fitleague.store",              # Production React frontend
    "https://www.fitleague.store",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    "https://fitleague.store",
    "https://www.fitleague.store",
    "https://api.fitleague.store",
    "https://*.ondigitalocean.app",
]

# ================================
# DEFAULTS
# ================================
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
