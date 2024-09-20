SF.payload.Inspection_conducted_at_Location = {};
SF.payload.Inspection_conducted_at_Location.servicetrade_location_name = SF.payload.servicetrade_location_name;
SF.payload.Inspection_conducted_at_Location.servicetrade_location_street = SF.payload.servicetrade_location_street;
SF.payload.Inspection_conducted_at_Location.servicetrade_location_city = SF.payload.servicetrade_location_city;
SF.payload.Inspection_conducted_at_Location.servicetrade_location_state = SF.payload.servicetrade_location_state;
SF.payload.Inspection_conducted_at_Location.servicetrade_location_postal_code = SF.payload.servicetrade_location_postal_code;

SF.payload.For_Customer = {};
SF.payload.For_Customer.servicetrade_customer_name = SF.payload.servicetrade_customer_name;
SF.payload.For_Customer.servicetrade_customer_street = SF.payload.servicetrade_customer_street;
SF.payload.For_Customer.servicetrade_customer_city = SF.payload.servicetrade_customer_city;
SF.payload.For_Customer.servicetrade_customer_state = SF.payload.servicetrade_customer_state;
SF.payload.For_Customer.servicetrade_customer_postal_code = SF.payload.servicetrade_customer_postal_code;

let servicetrade_assets_extinguisher = SF.payload.servicetrade_assets_extinguisher || [];
let servicetrade_assets_wheeled_fire_extinguisher = SF.payload.servicetrade_assets_wheeled_fire_extinguisher || [];

servicetrade_assets_extinguisher.forEach(function (a) {
    a.properties_manufacture_date = a.properties_manufacture_date ? Moment(a.properties_manufacture_date, 'X').format('YYYY-MM-DD') : null;
    a.properties_last_12_year_test_date = a.properties_last_12_year_test_date ? Moment(a.properties_last_12_year_test_date, 'X').format('YYYY-MM-DD') : null;
    a.properties_last_5_year_hydro_date = a.properties_last_5_year_hydro_date ? Moment(a.properties_last_5_year_hydro_date, 'X').format('YYYY-MM-DD') : null;
    a.properties_last_6_year_test_date = a.properties_last_6_year_test_date ? Moment(a.properties_last_6_year_test_date, 'X').format('YYYY-MM-DD') : null;
});
SF.payload.servicetrade_assets_extinguisher = servicetrade_assets_extinguisher;


servicetrade_assets_wheeled_fire_extinguisher.forEach(function (b) {
    b.properties_manufacture_date = b.properties_manufacture_date ? Moment(b.properties_manufacture_date, 'X').format('YYYY-MM-DD') : null;
    b.properties_last_6_year_test_date = b.properties_last_6_year_test_date ? Moment(b.properties_last_6_year_test_date, 'X').format('YYYY-MM-DD') : null;
    b.properties_last_hydro_date = b.properties_last_hydro_date ? Moment(b.properties_last_hydro_date, 'X').format('YYYY-MM-DD') : null;
    b.properties_cartridge_manufacture_date = b.properties_cartridge_manufacture_date ? Moment(b.properties_cartridge_manufacture_date, 'X').format('YYYY-MM-DD') : null;
    b.properties_cartridge_hydrotest_date = b.properties_cartridge_hydrotest_date ? Moment(b.properties_cartridge_hydrotest_date, 'X').format('YYYY-MM-DD') : null;
});

SF.payload.servicetrade_assets_wheeled_fire_extinguisher = servicetrade_assets_wheeled_fire_extinguisher;