@echo off
echo 🚀 Building RitualServiceNG project...

REM Clean previous build
if exist dist rmdir /s /q dist

REM Build the project
call npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
    
    REM Copy .htaccess to the browser output directory
    echo 📁 Copying configuration files...
    copy public\.htaccess dist\ritual-service-ng\browser\
    copy public\web.config dist\ritual-service-ng\browser\
    
    REM Ensure index.csr.html is the primary file
    echo 🎯 Setting index.csr.html as primary...
    
    REM Create a simple index.html that redirects to index.csr.html
    echo ^<!DOCTYPE html^> > dist\ritual-service-ng\browser\index.html
    echo ^<html^> >> dist\ritual-service-ng\browser\index.html
    echo ^<head^> >> dist\ritual-service-ng\browser\index.html
    echo     ^<meta charset="utf-8"^> >> dist\ritual-service-ng\browser\index.html
    echo     ^<meta http-equiv="refresh" content="0;url=index.csr.html"^> >> dist\ritual-service-ng\browser\index.html
    echo     ^<title^>Redirecting...^</title^> >> dist\ritual-service-ng\browser\index.html
    echo ^</head^> >> dist\ritual-service-ng\browser\index.html
    echo ^<body^> >> dist\ritual-service-ng\browser\index.html
    echo     ^<p^>Redirecting to application...^</p^> >> dist\ritual-service-ng\browser\index.html
    echo     ^<script^>window.location.href = 'index.csr.html';^</script^> >> dist\ritual-service-ng\browser\index.html
    echo ^</body^> >> dist\ritual-service-ng\browser\index.html
    echo ^</html^> >> dist\ritual-service-ng\browser\index.html
    
    echo ✅ Configuration complete!
    echo 📂 Build output: dist\ritual-service-ng\browser\
    echo 🌐 Upload the contents of the browser folder to your cPanel public_html directory
    echo 🔧 The .htaccess file will make cPanel automatically serve index.csr.html
    
) else (
    echo ❌ Build failed!
    pause
    exit /b 1
)

pause
