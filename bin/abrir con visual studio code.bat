@echo off

pushd ..
set parentPath=%cd%

echo ===============================================
echo abriendo %parentPath% con el visual studio code
echo ===============================================

code -n .
