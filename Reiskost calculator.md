```math

# Personen
Personen = 4 =>

# Aantal dagen
dagen = 4 => 

# Vlucht per persoon
Vluchten = EUR 130
Koffer = EUR 30 #pp
PrijsVluchten = @sum =>

# Auto - Totaal
parking = EUR 48
Huurauto = EUR 135
Benzine = EUR 70
Tol = EUR 30
PrijsAuto = @sum =>

# Hotel = Prijs per nacht Totaal
PrijsHotel = EUR 40
HotelTotaal = PrijsHotel*(dagen-1) =>

# Geschatte onkosten per dag (bvb eten) Per Persoon
Onkosten = EUR 25
Onkostenpp = Onkosten*dagen =>

# Totale Prijs per persoon
Vluchtpp = Vluchten+Koffer
Autopp = ((parking+Huurauto+Benzine+Tol)/Personen)
Hotelpp = (PrijsHotel*(dagen-1))/Personen
TotaalPP = Vluchtpp+Autopp+Hotelpp+Onkostenpp =>