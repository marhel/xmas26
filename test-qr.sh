#!/bin/bash
# Kör qr.sh i en tom katalog och kontrollerar resultatet
QR=$(realpath "$(dirname "$0")/qr.sh")
DIR=$(mktemp -d)
trap 'rm -rf $DIR' EXIT
cd $DIR
bash $QR > /dev/null 2>&1

FAIL=0
check() {
	if eval "$2"; then echo "ok   $1"; else echo "FAIL $1"; FAIL=1; fi
}
check "groups har 24 rader" '[ $(wc -l < groups) -eq 24 ]'
check "groups innehåller bara sexsiffriga hexkoder" '! grep -qvE "^[0-9a-f]{6}$" groups'
check "groups innehåller 24 unika koder" '[ $(sort -u groups | wc -l) -eq 24 ]'
check "dagar har 24 bilder" '[ $(ls dagar/dec-*.png 2>/dev/null | wc -l) -eq 24 ]'
check "qr-kalender.png skapas" '[ -s qr-kalender.png ]'
exit $FAIL
