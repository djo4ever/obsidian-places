

```math

# Personen
Personen = 4


# Aantal dagen
Dagen = 3

# Vlucht
Vlucht = eur 50
Koffer = eur 0
Vluchttotaal_pp = @sum =>

# Auto
Poppy = eur 60
Huurauto = eur 135
Benzine = eur 60
Tol = eur 15
AutoTotaal_pp = @sum/Personen =>

# Hotel per nacht totaal
Hotel = EUR 120
HotelTotaal_pp = (Hotel*(Dagen-1))/Personen =>

# Onkosten (resto etc), geschat per dag
Dagonkosten = EUR 50
DagonkostenTotaal_pp = Dagonkosten*Dagen =>

# Kosten per persoon
Totaal_pp = Vluchttotaal_pp+AutoTotaal_pp+HotelTotaal_pp+DagonkostenTotaal_pp =>








```