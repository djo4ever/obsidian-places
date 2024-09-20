---
location: 50.8957143,4.3410685
country: BE
tags:
  - Architectuur
---

![[Atomium, Eeuwfeestlaan, Verregat, Mutsaard, Laken, Brussel, Brussel-Hoofdstad, Brussel Hoofdstad, 1020, België-20240920145448307.png]]
**Type**
Spot: `INPUT[suggester(
option(Adventure),
option(Architectuur),
option(Kunst),
option(Museum),
option(Natuur),
option(Stadje)
):tags]`

Urbex:`INPUT[suggester(
option(Urbex\Brug),
option(Urbex Cafe),
option(Urbex Discotheek),
option(Urbex Gevangenis),
option(Urbex GhostTown),
option(Urbex Hotel),
option(Urbex Huis),
option(Urbex Industrie),
option(Urbex Kerk),
option(Urbex Militair),
option(Urbex Medisch),
option(Urbex Pretpark),
option(Urbex Restaurant),
option(Urbex Schip),
option(Urbex School),
option(Urbex Sport),
option(Urbex Theater),
option(Urbex Trein),
option(Urbex Vliegtuig),
option(Urbex Zwembad)
):tags]`

**Beschrijving** `INPUT[textArea:description]`
**Website** `INPUT[text(placeholder(www...)):website]`
**LKV**: `INPUT[datePicker(defaultValue(none)):lkv]`
```meta-bind
INPUT[multiSelect(option(Visited,Bezocht),option(Gone,Gone)):tags]
```



