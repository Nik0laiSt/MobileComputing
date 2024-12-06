#!/usr/bin/expect -f

# Setze Timeout
set timeout 20

# Hole Umgebungsvariablen (NPM User, Token, E-Mail)
set username bryntum..cmb.fambaum.com
set password trial
set email bryntum@cmb.fambaum.com

# Starte npm login und erwarte Eingabeaufforderungen
spawn npm login --registry=https://npm.bryntum.com

# Gebe den Benutzernamen ein
expect "Username:"
send "$username\r"

# Gebe das Passwort ein
expect "Password:"
send "$password\r"

# Gebe die E-Mail-Adresse ein
expect "Email address"
send "$email\r"

# Warten bis der Prozess endet
expect eof
