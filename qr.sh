NUM=0
if [ ! -f groups ]; then
	echo Genererar 24 groups
	for n in {1..24}; do hexdump -n 3 -e '4/4 "%06x" 1 "\n"' /dev/random; done > groups
else
	echo Groups finns redan
fi
YEAR=$(date +%y)
cat groups | xargs -I% echo https://marhel.github.io/xmas$YEAR/?g=% | while read URL
do   
	NUM=$(($NUM + 1))
	if [[ $NUM -lt 10 ]]; then
		PADDEDNUM=0$NUM
	else
		PADDEDNUM=$NUM
    fi
	echo Bild $PADDEDNUM
	FILE=dagar/dec-$PADDEDNUM
	qrencode --size 13 --dpi 300 --level=H --output $FILE-tmp.png $URL
	/home/martin/src/julkalender/magick convert -gravity Center -pointsize 30 -fill white \
          -draw "rectangle 273,273 311,311" -fill white \
          -draw "rectangle 275,275 309,309" -fill red -draw "text 0,0 \"$PADDEDNUM\"" $FILE-tmp.png $FILE.png
	rm $FILE-tmp.png
done
echo Monterar qr-kalender.png
# -label "%t" 
/home/martin/src/julkalender/magick montage -geometry 585x585+4+4 dagar/*.png qr-kalender.png
