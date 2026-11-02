import json

# 15 Two-Wheeler Items
tw_items = [
    {
        "id": "tw_01",
        "category": "2w",
        "title": "Superbike Computerized OBD/ECU Diagnostic",
        "workDescription": "Master technician handheld tablet scanner se superbike ki ECU mapping check karte huye. Sensor voltages, live AFR readings, aur throttle position sensor telemetry calibrate ki ja rahi hai.",
        "toolsUsed": "Handheld OBD2 Diagnostic Tablet, Multi-protocol CAN-Bus Cable, Digital Oscilloscope",
        "technicians": "Shahrukh Master Technician & Electronics Specialist",
        "vehicle": "Kawasaki Ninja ZX-10R / KTM Duke 390",
        "area": "Gachibowli Diagnostic Lab",
        "tag": "ECU & OBD DIAGNOSTICS"
    },
    {
        "id": "tw_02",
        "category": "2w",
        "title": "Engine Overhaul on Hydraulic Ramp",
        "workDescription": "Elevated bike lift par open engine, technician precision torque wrench se piston/head assemble karte huye. Cylinder bore honing aur fresh Viton stem seals fit kiye ja rahe hain.",
        "toolsUsed": "Pneumatic Bike Lift, Micrometer Torque Wrench, Piston Ring Compressor, Feeler Gauges",
        "technicians": "Shahrukh Master Technician & 2 Helpers",
        "vehicle": "Royal Enfield Continental GT 650",
        "area": "Bay 02 - Precision Overhaul Lab",
        "tag": "ENGINE OVERHAUL (1-YR WARRANTY)"
    },
    {
        "id": "tw_03",
        "category": "2w",
        "title": "Gearless Scooter (Activa/Jupiter) Transmission Service",
        "workDescription": "Variator roller, clutch belt, aur pulley cleaning tools ke saath service bay mein. Judder-free take-off ke liye dry sliders aur kevlar drive belt calibrate ki ja rahi hai.",
        "toolsUsed": "Pneumatic Clutch Bell Holder, Acetone Degreasing Tank, Variator Spanner Lock",
        "technicians": "Harish Kumar (Lead CVT Specialist)",
        "vehicle": "Honda Activa 6G / TVS Jupiter 125",
        "area": "Bay 01 - Quick CVT Service Bay",
        "tag": "CVT & TRANSMISSION"
    },
    {
        "id": "tw_04",
        "category": "2w",
        "title": "Dyno Tuning & Performance Exhaust Check",
        "workDescription": "Superbike roller dyno testing bay mein, exhaust gas analyzer aur digital monitor screens ke saath. Peak BHP aur torque curves calibrate kiye ja rahe hain.",
        "toolsUsed": "Chassis Dynamometer, Wideband O2 Exhaust Sniffer, High-Velocity Cooling Blowers",
        "technicians": "Master ECU Tuner & Dyno Engineer",
        "vehicle": "BMW S1000RR / Yamaha R15 V4",
        "area": "Dyno Performance Bay",
        "tag": "PERFORMANCE TUNING"
    },
    {
        "id": "tw_05",
        "category": "2w",
        "title": "Carburetor & Fuel Injector Ultrasonic Cleaning",
        "workDescription": "Ultrasonic cleaning machine aur bench tester par injectors clean aur calibrate karte huye. Micron-level spray pattern aur fuel flow rate benchmark kiya ja raha hai.",
        "toolsUsed": "Heated Ultrasonic Tank, 4-Cylinder Injector Flow Bench, Digital Pressure Gauge",
        "technicians": "Fuel System Senior Technician",
        "vehicle": "KTM RC 390 / Bajaj Pulsar NS200",
        "area": "Clean Room Calibration Lab",
        "tag": "FUEL SYSTEM LAB"
    },
    {
        "id": "tw_06",
        "category": "2w",
        "title": "Front Fork & Rear Suspension Overhaul",
        "workDescription": "Hydraulic fork oil seal change aur monoshock calibration bench par technician kaam karte huye. Damping rebound rate aur nitrogen gas pressure recharge kiya ja raha hai.",
        "toolsUsed": "Inverted Fork Spring Compressor, Nitrogen Gas Charging Rig, Micrometer Height Gauge",
        "technicians": "Suspension & Chassis Specialist",
        "vehicle": "KTM 390 Adventure / RE Himalayan 450",
        "area": "Chassis & Geometry Bay",
        "tag": "SUSPENSION OVERHAUL"
    },
    {
        "id": "tw_07",
        "category": "2w",
        "title": "Brembo / ABS Disc Brake Bleeding & Service",
        "workDescription": "Hydraulic brake bleeder tool aur precision caliper service commuter aur superbikes ke liye. Sintered brake pads aur DOT 5.1 fluid air-bubble-free flush ho raha hai.",
        "toolsUsed": "Pneumatic Vacuum Brake Bleeder, Sintered Pad Gauge, Caliper Piston Press",
        "technicians": "Brake System Lead Technician",
        "vehicle": "Ducati Monster / Dominar 400",
        "area": "Braking & Safety Bay",
        "tag": "HYDRAULIC BRAKES"
    },
    {
        "id": "tw_08",
        "category": "2w",
        "title": "Electrical Wiring & Relay Harness Troubleshooting",
        "workDescription": "Digital multimeter, heat-shrink harness tools, aur computerized circuit testing. Short circuits, battery parasitic drain, aur CAN-Bus wiring faults trace kiye ja rahe hain.",
        "toolsUsed": "Fluke Automotive Multimeter, Thermal Imaging Camera, Automotive Pinout Test Kit",
        "technicians": "Auto-Electrical Master Technician",
        "vehicle": "Royal Enfield Classic 350 / Ather 450X",
        "area": "Electrical Diagnostics Bay",
        "tag": "ELECTRICAL HARNESS"
    },
    {
        "id": "tw_09",
        "category": "2w",
        "title": "Chain Drive & Sprocket Replacement",
        "workDescription": "Heavy-duty chain breaker tool, alignment laser, aur professional lubricant spray station. X-Ring chain tension aur laser sprocket straightness adjust kiya ja raha hai.",
        "toolsUsed": "Laser Chain Alignment Tool, Chain Riveter/Breaker, Motul Chain Maintenance Station",
        "technicians": "Drivetrain Specialist & Helper",
        "vehicle": "Kawasaki Z900 / Suzuki Hayabusa",
        "area": "Drivetrain Bay",
        "tag": "CHAIN & SPROCKETS"
    },
    {
        "id": "tw_10",
        "category": "2w",
        "title": "Wheel Trueing & Dynamic Tire Balancing",
        "workDescription": "Computerized motorcycle wheel balancing machine aur tire changer machine work bay. High-speed wobble khatam karne ke liye dial gauge se rim runout zero kiya ja raha hai.",
        "toolsUsed": "Digital Dynamic Wheel Balancer, Motorcycle Rim Trueing Stand, Dial Indicator",
        "technicians": "Wheel & Alignment Specialist",
        "vehicle": "Triumph Tiger 900 / Harley-Davidson Iron 883",
        "area": "Wheel & Tire Lab",
        "tag": "TIRE & BALANCING"
    },
    {
        "id": "tw_11",
        "category": "2w",
        "title": "Valve Clearance & Shim Tappet Adjustment",
        "workDescription": "Feeler gauge aur micro-calipers se engine head valve timing set karte senior mechanic. Perfect cold clearance maintain karke peak compression lock kiya ja raha hai.",
        "toolsUsed": "Precision Feeler Gauge Set, Digital Vernier Caliper, Camshaft Timing Lock Pins",
        "technicians": "Shahrukh Master Engine Tuner",
        "vehicle": "Yamaha MT-15 / KTM Duke 250",
        "area": "Precision Valve Bay",
        "tag": "VALVE TIMING & SHIMS"
    },
    {
        "id": "tw_12",
        "category": "2w",
        "title": "Complete Foam Wash & Anti-Rust Detailing Bay",
        "workDescription": "Dedicated wash bay mein high-pressure washer, snow foam lance, aur air dryer station. Engine crevices se grease remove karke ceramic hydrophobic spray lagaya ja raha hai.",
        "toolsUsed": "180-Bar Pressure Washer, Italian Snow Foam Cannon, Warm Air Blow Dryer",
        "technicians": "Detailing Team & Washing Specialists",
        "vehicle": "All 2-Wheeler Fleet",
        "area": "Dedicated Hydro Detailing Bay",
        "tag": "DETAILING & FOAM WASH"
    },
    {
        "id": "tw_13",
        "category": "2w",
        "title": "Pre-Delivery 30-Point Quality Inspection",
        "workDescription": "Senior technician digital checklist clipboard ke saath headlight, brakes aur engine scan karte huye. Quality pass hone ke baad road test certificate generate ho raha hai.",
        "toolsUsed": "Digital Quality Tablet, Battery Conductance Tester, Sound DB Meter",
        "technicians": "Quality Audit Head Inspector",
        "vehicle": "Superbikes & Commuters",
        "area": "Final Delivery Bay",
        "tag": "30-POINT INSPECTION"
    },
    {
        "id": "tw_14",
        "category": "2w",
        "title": "Doorstep Pickup & Breakdown Loading Van",
        "workDescription": "Hydraulic tail-lift wali branded CC Motocrafts pickup van mein bike secure load karte helpers. Hyderabad ke VIP areas se scratchless transport kiya ja raha hai.",
        "toolsUsed": "Hydraulic Van Tail-Lift, Soft-Tie Ratchet Straps, Wheel Chock Mounts",
        "technicians": "Doorstep Logistics Crew (Ramu & Team)",
        "vehicle": "Doorstep VIP Transit Service",
        "area": "Gachibowli 20km VIP Radius",
        "tag": "FREE DOORSTEP PICKUP"
    },
    {
        "id": "tw_15",
        "category": "2w",
        "title": "Organized Special Tool Wall (Snap-on / Stanley Tools)",
        "workDescription": "Custom red/black shadow board jahan specialized bike diagnostic tools perfectly arranged hain. Har precision spanner aur puller ISO standard workshop specs par maintain hai.",
        "toolsUsed": "Calibrated Micrometers, Flywheel Pullers, Bearing Race Drivers, Clutch Holding Tools",
        "technicians": "Workshop Tool Control Officer",
        "vehicle": "CC Motocrafts Central Tool Wall",
        "area": "Central Workshop Facility",
        "tag": "SPECIALIZED TOOLING"
    }
]

# 15 Four-Wheeler Items
fw_items = [
    {
        "id": "fw_01",
        "category": "4w",
        "title": "Engine Hoist Crane Removal",
        "workDescription": "Luxury SUV ka bonnet open, hydraulic engine crane se engine block bahar nikaalte senior technician aur 2 helpers. Heavy-duty chassis cradle unbolted aur transmission uncoupled.",
        "toolsUsed": "3-Ton Hydraulic Engine Hoist, Heavy-Duty Engine Stand, Transmission Jack",
        "technicians": "Suresh Reddy & Heavy Engine Mechanics",
        "vehicle": "Toyota Fortuner / Mahindra Scorpio-N",
        "area": "Bay 04 - Heavy Commercial Lift Bay",
        "tag": "ENGINE OVERHAUL LAB"
    },
    {
        "id": "fw_02",
        "category": "4w",
        "title": "Dual-Post Hydraulic Car Ramp Service",
        "workDescription": "Lift par car elevated, neeche technician suspension, exhaust aur gearbox oil change karte huye. Under-chassis bushings aur ball joints play check kiye ja rahe hain.",
        "toolsUsed": "4-Ton Electro-Hydraulic 2-Post Lift, Pneumatic Oil Drainer, Under-Hoist Worklamp",
        "technicians": "Under-Chassis Service Crew",
        "vehicle": "Hyundai Creta / Kia Seltos",
        "area": "Bay 03 - Hydraulic Ramp Bay",
        "tag": "PERIODIC MAINTENANCE"
    },
    {
        "id": "fw_03",
        "category": "4w",
        "title": "Computerized Engine Diagnostics (OBD2 Live Data)",
        "workDescription": "Car dashboard ke paas rolling diagnostic cart aur wireless tablet scan tool par fault codes clear karte huye. Fuel trim adaptations aur live ABS/SRS sensor graphs logged hain.",
        "toolsUsed": "Launch X431 Master Diagnostic Scanner, Rolling Tech Cart, Digital Multimeter",
        "technicians": "Shahrukh Master Diagnostic Specialist",
        "vehicle": "Skoda Octavia / BMW 3-Series",
        "area": "ECU Diagnostics Lab",
        "tag": "OBD-II LIVE TELEMETRY"
    },
    {
        "id": "fw_04",
        "category": "4w",
        "title": "Dust-Free Spray Paint Booth",
        "workDescription": "Full protective white suit aur mask mein technician HVLP spray gun se car body par mirror-finish paint karte huye. Positive air pressure filtration se 100% dust-free finish ensured.",
        "toolsUsed": "Down-Draft Paint Booth, Devilbiss HVLP Spray Gun, Clean Air Breathing Mask",
        "technicians": "Senior Automotive Painter",
        "vehicle": "Tata Safari / Volkswagen Virtus",
        "area": "Down-Draft Paint Booth",
        "tag": "DUST-FREE BOOTH"
    },
    {
        "id": "fw_05",
        "category": "4w",
        "title": "Infrared Paint Curing Lamps",
        "workDescription": "Paint booth mein shortwave infrared heat lamps car panel paint bake aur dry karte huye. Hard clearcoat finish 30 minutes mein factory toughness achieve karti hai.",
        "toolsUsed": "3-Cassette Shortwave IR Heat Lamp, Digital Surface Laser Thermometer",
        "technicians": "Paint Finish Curing Specialist",
        "vehicle": "Audi A4 / MG Hector",
        "area": "Thermal Curing Bay",
        "tag": "INFRARED CURING"
    },
    {
        "id": "fw_06",
        "category": "4w",
        "title": "Precision Dent Pulling (Stud Welder Station)",
        "workDescription": "Digital dent puller aur stud welder machine se car door panel ke dents bina cut kiye nikaalte huye. Original panel sheet metal shape restore ki ja rahi hai.",
        "toolsUsed": "Digital Spot Stud Welder, Slide Hammer, Lever Pulling Bar, Carbon Shrinking Tip",
        "technicians": "Master Bodywork Sheet Metal Craftsman",
        "vehicle": "Maruti Grand Vitara / Honda City",
        "area": "Tinkering & Bodywork Bay",
        "tag": "STUD DENT PULLING"
    },
    {
        "id": "fw_07",
        "category": "4w",
        "title": "Automatic AC Gas Recovery & Refilling",
        "workDescription": "Fully automatic 3-in-1 AC machine se refrigerant vacuuming, leakage test aur gas charge karte huye. Compressor PAG oil refresh aur sub-zero cabin cooling guaranteed.",
        "toolsUsed": "Robinair Fully Automated R134a/R1234yf AC Station, Electronic Leak Detector",
        "technicians": "HVAC Auto Air-Conditioning Technician",
        "vehicle": "Hyundai Verna / Toyota Innova Crysta",
        "area": "Climate & AC Bay",
        "tag": "AUTOMATIC AC SERVICE"
    },
    {
        "id": "fw_08",
        "category": "4w",
        "title": "Disc Brake Lathe & Rotor Resurfacing",
        "workDescription": "On-car brake disc skimming machine se brake rotor surface smooth karte technician. High-speed brake judder aur uneven rotor wear micron accuracy se remove ho raha hai.",
        "toolsUsed": "On-Vehicle Brake Disc Lathe, Micrometer Thickness Gauge, Runout Dial Indicator",
        "technicians": "Precision Brake Lathe Machinist",
        "vehicle": "Ford Endeavour / Mahindra Thar",
        "area": "Machining & Lathe Bay",
        "tag": "ROTOR RESURFACING"
    },
    {
        "id": "fw_09",
        "category": "4w",
        "title": "3D Wheel Alignment & Camera Sensors",
        "workDescription": "High-tech 3D wheel alignment ramp par car ke charo wheels par reflector targets aur PC monitors. Camber, caster aur toe angle laser alignment se zero tire wear ensure hota hai.",
        "toolsUsed": "Corghi 3D Camera Wheel Alignment System, 4-Post Scissor Lift, Steering Lock Tool",
        "technicians": "Wheel Alignment & Geometry Engineer",
        "vehicle": "Mercedes-Benz C-Class / Tata Harrier",
        "area": "3D Laser Alignment Bay",
        "tag": "3D WHEEL ALIGNMENT"
    },
    {
        "id": "fw_10",
        "category": "4w",
        "title": "Automatic Transmission (AT/CVT) Fluid Flush",
        "workDescription": "Specialized machine se automatic gearbox oil complete drain aur fresh fluid flush karte huye. Torque converter aur valve body clutch sludge 100% evacuate ki ja rahi hai.",
        "toolsUsed": "Automatic Transmission Fluid (ATF) Exchange Machine, Optical Fluid Refractometer",
        "technicians": "Transmission Overhaul Specialist",
        "vehicle": "BMW X5 / Honda Civic CVT",
        "area": "Transmission Lab",
        "tag": "TRANSMISSION FLUSH"
    },
    {
        "id": "fw_11",
        "category": "4w",
        "title": "Underbody Anti-Rust Rubberized Coating",
        "workDescription": "Car lift par elevated, pneumatic spray gun se black anti-corrosion coating lagate worker. Silencer zinc treatment aur running board stone-chip protection apply ho raha hai.",
        "toolsUsed": "Airless Underbody Spray Gun, 3M Rubberized Sealant Barrels, Exhaust Heat Spray",
        "technicians": "Underbody Protection Specialist",
        "vehicle": "Mahindra Scorpio-N / Maruti Brezza",
        "area": "Underbody Coating Bay",
        "tag": "ANTI-RUST COATING"
    },
    {
        "id": "fw_12",
        "category": "4w",
        "title": "Interior Deep Foam Cleaning & Ozone Sanitization",
        "workDescription": "Tornador foam gun aur ozone generator machine se car interior upholstery disinfect karte huye. AC vents, carpets aur leather seats se bacteria aur odors 100% eliminate hote hain.",
        "toolsUsed": "Tornador Pneumatic Cleaning Gun, Industrial Ozone Sterilizer Machine, Hot Water Extractor",
        "technicians": "Interior Detailing Craftsman",
        "vehicle": "All 4-Wheeler Passenger Cars",
        "area": "Interior Care Bay",
        "tag": "OZONE SANITIZATION"
    },
    {
        "id": "fw_13",
        "category": "4w",
        "title": "Ceramic Coating & Dual-Action Buffing",
        "workDescription": "High-intensity inspection lights ke neeche rotary polisher se car paint par 9H ceramic coating apply karte huye. Swirl marks remove karke 3-year hydrophobic gloss lock ho rahi hai.",
        "toolsUsed": "Rupes Dual-Action Polisher, 9H Nano Ceramic Quartz Liquid, LED Paint Light Bar",
        "technicians": "Master Paint Detailer & Coating Specialist",
        "vehicle": "Volvo XC90 / Jeep Compass",
        "area": "Clean Detailing Studio",
        "tag": "CERAMIC 9H COATING"
    },
    {
        "id": "fw_14",
        "category": "4w",
        "title": "Suspension Strut & Bushing Hydraulic Press",
        "workDescription": "20-ton hydraulic press machine par suspension arm bushings replace karte mechanics. Creaking noise khatam karke factory ride comfort restore kiya ja raha hai.",
        "toolsUsed": "20-Ton Heavy Hydraulic Shop Press, Multi-Size Bushing Drift Kit, Spring Clamps",
        "technicians": "Heavy Suspension Mechanic",
        "vehicle": "Renault Duster / Hyundai Creta",
        "area": "Press & Heavy Mechanical Bay",
        "tag": "HYDRAULIC PRESS LAB"
    },
    {
        "id": "fw_15",
        "category": "4w",
        "title": "Master Tech Final Road-Test & Diagnostic Sign-Off",
        "workDescription": "Senior technician car ke andar OBD monitor connect karke final test drive checklist approve karte huye. High-speed braking, steering returnability aur emissions verified.",
        "toolsUsed": "Real-Time OBD Flight Recorder, Sound Level Analyzer, Digital Inspection Clipboard",
        "technicians": "Shahrukh Master Technician & Suresh Reddy",
        "vehicle": "Certified Cars & Fleets",
        "area": "Dynamic Road Test Circuit",
        "tag": "ROAD TEST CERTIFIED"
    }
]

all_items = tw_items + fw_items
with open('data/portfolio.json', 'w', encoding='utf-8') as f:
    json.dump(all_items, f, indent=2)

print(f"Successfully generated all {len(all_items)} portfolio items (15 Two-Wheeler + 15 Four-Wheeler) in data/portfolio.json!")
