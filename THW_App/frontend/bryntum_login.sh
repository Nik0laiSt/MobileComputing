#!/usr/bin/expect -f

# Setze Timeout
set timeout 20

# Hole Umgebungsvariablen (NPM User, Token, E-Mail)
set username peruecke-felsiger-2i..icloud.com
set password trial
set email peruecke-felsiger-2i@icloud.com

# Starte npm login und erwarte Eingabeaufforderungen
spawn npm login --registry=https://npm.bryntum.com

# Gebe den Benutzernamen ein
expect "Username:"
send "$username\r"

# Gebe das Passwort ein
expect "Password:"
send "$password\r"

# Gebe die E-Mail-Adresse ein
expect "Email:"
send "$email\r"

# Warten bis der Prozess endet
expect eof
