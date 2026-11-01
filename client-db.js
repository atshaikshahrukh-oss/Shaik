/**
 * CC MOTOCRAFTS - UNIVERSAL CLIENT-SIDE DATABASE & API FALLBACK
 * Allows the full platform (Portals, HTS AI Chat, 30 Portfolio items, Bookings,
 * Live Stream simulation, and Passcodes) to work 100% seamlessly on GitHub Pages,
 * static CDNs, local file double-clicks, and with Node.js servers!
 */

window.CC_DATA = {
  config: {
    platform: {
      name: "CC MOTOCRAFTS",
      tagline: "AI-Powered Dual Engine Diagnostic & Service Management Platform",
      domain: "ccmotocrafts.in",
      hotline: "+91 8333007351",
      whatsappNumber: "918333007351",
      officialEmail: "info@ccmotocrafts.in",
      centralAlertEmail: "aisupport.on@gmail.com",
      headquarters: "Gachibowli, Hyderabad, Telangana 500032, India"
    },
    security: {
      partnerPasscode: "cc105",
      customerPasscode: "cc1005",
      masterAdminPasscode: "cc102"
    },
    modes: {
      twoWheeler: {
        id: "2w",
        brandTitle: "CC Motocrafts AI Engine Labs Service",
        capacityRange: "100cc to 2,500cc",
        themeColor: "#00e5ff"
      },
      fourWheeler: {
        id: "4w",
        brandTitle: "CarS CareS Motocrafts AI Engine Labs Service",
        capacityRange: "500cc to 15,000cc",
        themeColor: "#ff9100"
      }
    },
    businessRules: {
      cancellationFee: 300,
      doorstepPickup: {
        freeRadiusKm: 20,
        centerLocation: "Gachibowli, Hyderabad",
        vipPincodes: ["500032", "500081", "500084", "500089", "500033", "500075", "500019"]
      },
      warrantyTerms: {
        generalService: { durationDays: 30, coverage: "30 Days Working Guarantee on tuned components" },
        engineRebuild: {
          durationMonths: 12,
          coverage: "1-Year Warranty covering Crankshaft, Cylinder Bore Kit, and Valve Defects",
          mandatoryFirstService: { minKm: 500, maxKm: 750, warning: "Strict First Service required between 500-750 KM (15-30 days)" },
          routineMaintenanceInterval: { minKm: 1800, maxKm: 2000, warning: "Routine checkup and oil service mandatory every 1,800-2,000 KM" }
        }
      }
    }
  },
  portfolio: [
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
  },
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
],
  bookings: [
  {
    "bookingId": "BK-2024-901",
    "createdAt": "2024-10-31 09:30 AM",
    "customer": {
      "name": "Syed Farhan",
      "mobile": "9849112233",
      "email": "farhan.syed@gmail.com",
      "vehicleType": "2w",
      "vehicleModel": "KTM Duke 390",
      "regNumber": "TS 09 EA 1234"
    },
    "servicePackage": "Stage-3 Precision Engine Rebuild & Valve Lapping",
    "serviceType": "engine_rebuild",
    "partnerId": "partner_001",
    "partnerName": "Harish CC Motocrafts Hub (Gachibowli)",
    "assignedBay": "Bay 02 - Precision Engine Overhaul Bay",
    "assignedTechnician": "Shahrukh Master Technician",
    "currentStage": "Step 2: Engine Disassembly in Progress",
    "stageIndex": 2,
    "progressPercent": 65,
    "currentKm": 20400,
    "lastServiceKm": 18500,
    "estimatedDelivery": "Today, 05:30 PM",
    "paymentStatus": "Paid Advance (\u20b95,000)",
    "totalEstimate": 8500,
    "doorstepPickup": {
      "isVipFree": true,
      "address": "Telecom Nagar, Gachibowli, Hyderabad - 500032",
      "driverAssigned": "Ramu (Flatbed Transporter #04)"
    },
    "warrantyStatus": {
      "type": "1-Year Engine Rebuild Overhaul Warranty",
      "active": true,
      "breakInDueKm": 21150,
      "rules": "Mandatory first service at 500-750 KM (15-30 days)"
    }
  },
  {
    "bookingId": "BK-2024-902",
    "createdAt": "2024-10-31 10:15 AM",
    "customer": {
      "name": "Dr. Ananya Rao",
      "mobile": "9123445566",
      "email": "ananya.rao@apollo.org",
      "vehicleType": "4w",
      "vehicleModel": "Hyundai Creta 1.5 SX(O)",
      "regNumber": "TS 08 FG 5541"
    },
    "servicePackage": "Mandatory First 700 KM Overhaul Checkup & Oil Flush",
    "serviceType": "engine_rebuild",
    "partnerId": "partner_003",
    "partnerName": "Banjara CarS CareS Fleet & Overhaul Hub",
    "assignedBay": "Bay 04 - Heavy Commercial & Car Lift Bay",
    "assignedTechnician": "Suresh Senior Overhaul Specialist",
    "currentStage": "Step 3: Fresh Synthetic Oil Refill & Torque Verification",
    "stageIndex": 3,
    "progressPercent": 80,
    "currentKm": 34200,
    "lastServiceKm": 33500,
    "estimatedDelivery": "Today, 02:00 PM",
    "paymentStatus": "Pending (Post Delivery)",
    "totalEstimate": 3800,
    "doorstepPickup": {
      "isVipFree": true,
      "address": "Road No. 12, Banjara Hills, Hyderabad - 500034",
      "driverAssigned": "Dedicated Driver (Kiran)"
    },
    "warrantyStatus": {
      "type": "1-Year Engine Overhaul Warranty",
      "active": true,
      "notes": "Break-in service underway to lock in 1-Year Crank & Cylinder Bore warranty"
    }
  },
  {
    "bookingId": "BK-2024-903",
    "createdAt": "2024-10-31 11:00 AM",
    "customer": {
      "name": "Karthik Varma",
      "mobile": "9700123456",
      "email": "karthik.varma@techmahindra.com",
      "vehicleType": "2w",
      "vehicleModel": "Honda Activa 6G H-Smart",
      "regNumber": "TS 07 HK 9088"
    },
    "servicePackage": "CVT Variator Overhaul & Periodic Transmission Tune",
    "serviceType": "general_service",
    "partnerId": "partner_001",
    "partnerName": "Harish CC Motocrafts Hub (Gachibowli)",
    "assignedBay": "Bay 01 - Quick CVT & Periodic Bay",
    "assignedTechnician": "Harish Kumar",
    "currentStage": "Step 1: Vehicle Inspection & CVT Teardown",
    "stageIndex": 1,
    "progressPercent": 30,
    "currentKm": 12100,
    "lastServiceKm": 11800,
    "estimatedDelivery": "Today, 03:30 PM",
    "paymentStatus": "Paid Online (\u20b92,450)",
    "totalEstimate": 2450,
    "doorstepPickup": {
      "isVipFree": true,
      "address": "Hi-Tech City, Madhapur, Hyderabad - 500081",
      "driverAssigned": "Doorstep Pickup Completed"
    },
    "warrantyStatus": {
      "type": "30-Day General Service Guarantee",
      "active": true,
      "notes": "Covers variator roller tuning & drive belt assembly"
    }
  },
  {
    "bookingId": "BK-2024-904",
    "createdAt": "2024-10-31 11:45 AM",
    "customer": {
      "name": "Vikram Singh",
      "mobile": "9988776655",
      "email": "vikram.ccmoto@gmail.com",
      "vehicleType": "4w",
      "vehicleModel": "Mahindra Thar 2.2 CRDe 4x4",
      "regNumber": "TS 09 EU 8812"
    },
    "servicePackage": "ECU Diagnostics, CAN-Bus Ripple Test & Turbo Overhaul",
    "serviceType": "engine_rebuild",
    "partnerId": "partner_004",
    "partnerName": "Secunderabad Classic & Commercial Workshop",
    "assignedBay": "Bay 03 - 4x4 Dyno & Diagnostics Bay",
    "assignedTechnician": "Suresh Senior Overhaul Specialist",
    "currentStage": "Step 1: Vehicle Inspection & OBD Scan Completed",
    "stageIndex": 1,
    "progressPercent": 25,
    "currentKm": 45800,
    "lastServiceKm": 43200,
    "estimatedDelivery": "Tomorrow, 12:00 PM",
    "paymentStatus": "Advance Paid (\u20b910,000)",
    "totalEstimate": 18500,
    "doorstepPickup": {
      "isVipFree": true,
      "address": "Sindhi Colony, Secunderabad - 500003",
      "driverAssigned": "Flatbed Hauler #02"
    },
    "warrantyStatus": {
      "type": "1-Year Engine Rebuild Warranty",
      "active": true,
      "notes": "Turbocharger boost pressure & intercooler circuit covered"
    }
  }
],
  partners: [
  {
    "id": "partner_001",
    "garageName": "Harish CC Motocrafts Hub",
    "ownerName": "Harish Kumar",
    "mobile": "+91 9849012345",
    "email": "harish.ccmoto@gmail.com",
    "location": "Plot 42, Telecom Nagar, Gachibowli, Hyderabad",
    "pincode": "500032",
    "segment": "both",
    "gstEnabled": true,
    "gstNumber": "36AABCC1234F1Z5",
    "tradeLicenseEnabled": true,
    "tradeLicenseNo": "GHMC/TL/2024/98712",
    "pollutionCertEnabled": true,
    "pollutionCertNo": "TS/PCB/DIAG/8841",
    "status": "active",
    "joinedDate": "2024-01-15",
    "totalInvoices": 142,
    "totalRevenue": 845200
  },
  {
    "id": "partner_002",
    "garageName": "Madhapur Superbike & Precision Lab",
    "ownerName": "Mohammed Rizwan",
    "mobile": "+91 9876543210",
    "email": "rizwan.superbikes@gmail.com",
    "location": "Near Durgam Cheruvu Metro, Madhapur, Hyderabad",
    "pincode": "500081",
    "segment": "2w",
    "gstEnabled": true,
    "gstNumber": "36XYZPK9876L2D9",
    "tradeLicenseEnabled": true,
    "tradeLicenseNo": "GHMC/TL/2023/45129",
    "pollutionCertEnabled": false,
    "pollutionCertNo": "",
    "status": "active",
    "joinedDate": "2024-03-10",
    "totalInvoices": 98,
    "totalRevenue": 512400
  },
  {
    "id": "partner_003",
    "garageName": "Banjara CarS CareS Fleet & Overhaul Hub",
    "ownerName": "Suresh Reddy",
    "mobile": "+91 9123456789",
    "email": "suresh.cars@gmail.com",
    "location": "Road No. 12, Banjara Hills, Hyderabad",
    "pincode": "500034",
    "segment": "4w",
    "gstEnabled": true,
    "gstNumber": "36AAECR5542M1Z0",
    "tradeLicenseEnabled": true,
    "tradeLicenseNo": "GHMC/TL/2022/88214",
    "pollutionCertEnabled": true,
    "pollutionCertNo": "TS/PCB/AUTO/3312",
    "status": "active",
    "joinedDate": "2023-11-20",
    "totalInvoices": 210,
    "totalRevenue": 2450000
  },
  {
    "id": "partner_004",
    "garageName": "Secunderabad Classic & Commercial Workshop",
    "ownerName": "Vikram Singh",
    "mobile": "+91 9988776655",
    "email": "vikram.ccmoto@gmail.com",
    "location": "MG Road, Secunderabad, Telangana",
    "pincode": "500003",
    "segment": "both",
    "gstEnabled": false,
    "gstNumber": "",
    "tradeLicenseEnabled": true,
    "tradeLicenseNo": "GHMC/TL/2024/11029",
    "pollutionCertEnabled": true,
    "pollutionCertNo": "TS/PCB/DIAG/4491",
    "status": "active",
    "joinedDate": "2024-06-01",
    "totalInvoices": 64,
    "totalRevenue": 312000
  }
],
  obd: [
  {
    "code": "P0300",
    "system": "Ignition & Combustion Chamber",
    "title": "Random / Multiple Cylinder Misfire Detected",
    "category": "both",
    "displacement": "100cc - 15,000cc",
    "symptoms": [
      "Engine vibration",
      "Sudden power dip under load",
      "Fuel smell in exhaust",
      "Flashing MIL"
    ],
    "rootCauses": [
      "Fouled spark plug or incorrect electrode gap (< 0.7mm)",
      "High-Tension (HT) coil insulation breakdown under high thermal load",
      "Fuel injector atomization spray nozzle clog",
      "Low cylinder compression due to tight valve tappet clearance"
    ],
    "multimeterSpecs": {
      "htCoilPrimaryResistance": "0.8 to 1.5 Ohms @ 20\u00b0C",
      "htCoilSecondaryResistance": "8.5k to 14.5k Ohms",
      "injectorResistance": "11.8 to 14.2 Ohms",
      "supplyVoltage": "12.4V to 14.2V DC (Ignition ON)"
    },
    "wiringPinout": {
      "ecuIgnitionDriver": "Pin 14 (Orange/Black wire)",
      "ground": "Chassis Ground (Brown/White wire)",
      "signalReturn": "Pin 28 (Yellow/Green wire)"
    },
    "canBusTelemetry": {
      "frameId": "0x18FEE000",
      "pid": "0x0C (Engine RPM variance > 80 RPM between crank cycles)",
      "protocol": "ISO 15765-4 (CAN 500kbps)"
    },
    "assemblyGuide": "Check intake/exhaust valve lash: Intake 0.08mm - 0.12mm, Exhaust 0.12mm - 0.16mm. Torque spark plug to 14-16 Nm.",
    "master25YearAdvice": "Ustad advice: Pehle spark plug nikaal kar color dekho. Agar black carbon hai toh lean misfire nahi rich hai; agar white dry hai toh intake manifold rubber O-ring se secondary air leak check karo."
  },
  {
    "code": "P0171",
    "system": "Fuel Trim & Air Metering",
    "title": "System Too Lean (Bank 1)",
    "category": "both",
    "displacement": "125cc - 8,000cc",
    "symptoms": [
      "Hesitation on throttle twist/press",
      "Surging idle",
      "Elevated engine cylinder temperature"
    ],
    "rootCauses": [
      "Manifold Absolute Pressure (MAP) / Mass Air Flow (MAF) sensor contaminated",
      "Cracked throttle body intake boot / vacuum leak",
      "Weak fuel pump delivery (< 2.8 Bar on 2W, < 3.8 Bar on 4W)",
      "Upstream Oxygen Sensor (O2) biased lean"
    ],
    "multimeterSpecs": {
      "mapSensorOutput": "0.8V to 1.2V DC at idle (Vacuum ~40 kPa)",
      "o2SensorVoltage": "0.1V to 0.9V fluctuating 8-10 times in 10 seconds",
      "fuelPumpCurrentDraw": "1.8A to 2.6A DC steady"
    },
    "wiringPinout": {
      "map5VReference": "Pin 5 (Red/White wire)",
      "mapSignal": "Pin 19 (Green/Black wire)",
      "sensorGround": "Pin 22 (Black/Blue wire)"
    },
    "canBusTelemetry": {
      "frameId": "0x7E8",
      "pid": "0x06 (Short Term Fuel Trim > +22%)",
      "protocol": "SAE J1939 / ISO 14229"
    },
    "assemblyGuide": "Inspect throttle rubber insulator for hairline fissures. Pressure test fuel rail with analogue gauge before replacing sensor.",
    "master25YearAdvice": "Throttle body ke vacuum pipe par brake cleaner spray karke engine RPM observe karo. Agar spray marte hi RPM bada, toh wahi se vacuum leak ho rahi hai!"
  },
  {
    "code": "P0420",
    "system": "Exhaust & Emissions Control",
    "title": "Catalytic Converter System Efficiency Below Threshold (Bank 1)",
    "category": "both",
    "displacement": "150cc - 6,000cc",
    "symptoms": [
      "Check engine lamp on",
      "Slight sluggish high-end acceleration",
      "Sulphur/rotten egg odor from silencer"
    ],
    "rootCauses": [
      "Downstream O2 sensor mimicking upstream sensor wave (exhaust core disintegrated)",
      "Exhaust header manifold gasket leak drawing outside ambient oxygen",
      "Unburnt fuel contamination burning inside the cat honeycomb matrix"
    ],
    "multimeterSpecs": {
      "downstreamO2Sensor": "Steady 0.55V - 0.70V DC at 2500 RPM (No ripple)",
      "heaterCircuitResistance": "4.2 to 8.0 Ohms @ ambient 25\u00b0C"
    },
    "wiringPinout": {
      "o2SensorHeater12V": "Relay Switched 12V (Red/Yellow wire)",
      "heaterControlECU": "Pin 36 (Brown/Orange wire)",
      "o2SignalHigh": "Pin 11 (Blue/White wire)"
    },
    "canBusTelemetry": {
      "frameId": "0x7E0",
      "pid": "0x15 (Downstream O2 Voltage matching 0x14 Upstream)",
      "protocol": "ISO 15765-4"
    },
    "assemblyGuide": "Thermal gun inspection: Cat inlet temperature must be at least 30\u00b0C to 50\u00b0C COOLER than outlet. If outlet is cooler, converter is clogged or inert.",
    "master25YearAdvice": "Direct cat converter change mat karo! Pehle downstream O2 heater circuit ka ground wire check karo, kai baar silencer ke paas heat se wire brittle ho jata hai."
  },
  {
    "code": "P0106",
    "system": "Intake Manifold & Air Induction",
    "title": "MAP / Barometric Pressure Sensor Range / Performance Issue",
    "category": "both",
    "displacement": "100cc - 12,000cc",
    "symptoms": [
      "Hard cold start",
      "Black smoke on hard acceleration",
      "Engine hunting at idle"
    ],
    "rootCauses": [
      "Carbon oil sludge blocking MAP sensor vacuum port nipple",
      "Sensor ground wire resistance > 0.5 Ohms",
      "EGR valve stuck partially open contaminating fresh charge"
    ],
    "multimeterSpecs": {
      "baroReference": "4.0V to 4.2V DC @ sea level / Hyderabad (600m ~ 3.8V)",
      "sensorGroundVoltageDrop": "< 0.05V DC",
      "supplyVoltage": "5.00V \u00b1 0.05V DC"
    },
    "wiringPinout": {
      "5V_Vref": "Pin 8 (White/Red)",
      "MAP_Sig": "Pin 21 (Green/Yellow)",
      "Sig_GND": "Pin 17 (Black/Brown)"
    },
    "canBusTelemetry": {
      "frameId": "0x18F00400",
      "pid": "0x0B (Intake Manifold Absolute Pressure)",
      "protocol": "SAE J1939"
    },
    "assemblyGuide": "Clean sensor only using dedicated MAF/electronic contact cleaner. Never poke needle or metal pick into the silicone diaphragm orifice.",
    "master25YearAdvice": "KTM aur Royal Enfield 650 mein airbox ke breather pipe se oil vapor aake MAP sensor ko ganda karta hai. Airbox drain screw khol ke tel saaf karo pehle."
  },
  {
    "code": "P0700",
    "system": "Transmission & CVT Management",
    "title": "Transmission Control System Malfunction / CVT Slip Warning",
    "category": "both",
    "displacement": "110cc - 5,000cc",
    "symptoms": [
      "High RPM without proportionate road speed",
      "Jerky take-off",
      "CVT belt screeching or limp home mode"
    ],
    "rootCauses": [
      "CVT primary/secondary variator roller flat spots",
      "Worn drive belt width below wear limit (< 18.5mm on scooters)",
      "Transmission fluid temperature sensor out of calibration",
      "Shift solenoid valve 'A' circuit stuck"
    ],
    "multimeterSpecs": {
      "tftSensorResistance": "2.2k to 2.7k Ohms @ 20\u00b0C, 250 to 350 Ohms @ 80\u00b0C",
      "solenoidResistance": "12.0 to 16.0 Ohms"
    },
    "wiringPinout": {
      "tcmCanHigh": "Pin 6 (Blue/White twisted pair)",
      "tcmCanLow": "Pin 14 (White/Blue twisted pair)",
      "solenoidPower": "Pin 3 (Black/Red)"
    },
    "canBusTelemetry": {
      "frameId": "0x18F00503",
      "pid": "0x02 (Speed ratio mismatch: Engine RPM vs Wheel Speed > 18%)",
      "protocol": "ISO 14229"
    },
    "assemblyGuide": "Degrease variator faces with acetone. Torque CVT clutch bell nut to 45-50 Nm (2W) using spanner holder. Never lubricate variator ramp sliders with standard grease.",
    "master25YearAdvice": "Activa ya Jupiter mein agar pickup mar raha hai aur awaz aa rahi hai, toh variator bushing check karo. Agar usme play aa gaya toh belt tirchi chalegi aur jaldi toot jayegi."
  }
],
  customers: [
  {
    "id": "cust_101",
    "name": "Syed Farhan",
    "mobile": "+91 9849112233",
    "email": "farhan.syed@gmail.com",
    "vehicleType": "2w",
    "vehicleModel": "KTM Duke 390",
    "regNumber": "TS 09 EA 1234",
    "currentKm": 20400,
    "lastServiceDate": "2024-08-15",
    "lastServiceKm": 18500,
    "lastWorkDone": [
      "Motul 300V 15W50 Full Synthetic Oil Change",
      "KTM OEM Oil Filter & O-Ring Replacement",
      "Front Brembo Brake Pad Replacement",
      "Radiator Coolant Flush & De-aerate"
    ],
    "warrantyStatus": {
      "type": "General Service 30-Day Guarantee",
      "validUntil": "2024-09-15",
      "isActive": false,
      "notes": "Service interval reached: 1,900 KM elapsed since last maintenance (Recommended interval: 1,800 - 2,000 KM)."
    },
    "servicePitch": "Aapka last service 15 August ko 18,500 KM par hua tha. Aaj 20,400 KM ho chuke hain. Aapka 1,900 KM maintenance interval ho gaya hai! Engine protection ke liye oil and filter checkup zaroori hai."
  },
  {
    "id": "cust_102",
    "name": "Dr. Ananya Rao",
    "mobile": "+91 9123445566",
    "email": "ananya.rao@apollo.org",
    "vehicleType": "4w",
    "vehicleModel": "Hyundai Creta 1.5 SX(O)",
    "regNumber": "TS 08 FG 5541",
    "currentKm": 34200,
    "lastServiceDate": "2024-09-28",
    "lastServiceKm": 33500,
    "lastWorkDone": [
      "Stage-3 Engine Rebuild & Cylinder Bore Honing",
      "Crankshaft Micropolish & New Main Bearings",
      "Intake & Exhaust Valve Lapping with New Viton Stem Seals",
      "Synthetic Break-In Oil Refill (5W-30)"
    ],
    "warrantyStatus": {
      "type": "1-Year Engine Overhaul Warranty",
      "validUntil": "2025-09-28",
      "isActive": true,
      "firstServiceDue": "Between 34,000 KM to 34,250 KM (Due Now!)",
      "notes": "MANDATORY FIRST SERVICE REQUIRED NOW (700 KM run since overhaul). Engine oil and metal flush needed to maintain 1-year warranty."
    },
    "servicePitch": "Doctor sahiba, aapki Creta ka engine overhaul 33,500 KM par hua tha. Ab gadi 700 KM chal chuki hai. CC Motocrafts strict warranty rule ke hisab se 500-750 KM first checkup zaroori hai taaki aapka 1-year engine warranty safe rahe!"
  },
  {
    "id": "cust_103",
    "name": "Karthik Varma",
    "mobile": "+91 9700123456",
    "email": "karthik.varma@techmahindra.com",
    "vehicleType": "2w",
    "vehicleModel": "Honda Activa 6G H-Smart",
    "regNumber": "TS 07 HK 9088",
    "currentKm": 12100,
    "lastServiceDate": "2024-10-10",
    "lastServiceKm": 11800,
    "lastWorkDone": [
      "CVT Variator Overhaul & Slider Cleaning",
      "Bando Drive Belt Replacement",
      "Air Filter Clean & Carb/Injector Flush",
      "Castrol ActiBond 10W30 Engine & Gear Oil Refill"
    ],
    "warrantyStatus": {
      "type": "General Service 30-Day Guarantee",
      "validUntil": "2024-11-10",
      "isActive": true,
      "notes": "Under active 30-day workmanship guarantee until Nov 10, 2024."
    },
    "servicePitch": "Karthik ji, aapka Activa 6G active 30-day service warranty mein hai. Koi bhi minor vibration ya idle issue ho toh complimentary inspection available hai."
  }
],
  jobCards: [
  {
    "jobCardId": "JC-2024-8841",
    "accessKey": "cc1005",
    "customer": {
      "name": "Syed Farhan",
      "mobile": "9849112233",
      "email": "farhan.syed@gmail.com",
      "vehicleModel": "KTM Duke 390",
      "regNumber": "TS 09 EA 1234"
    },
    "partnerId": "partner_001",
    "partnerName": "Harish CC Motocrafts Hub",
    "leadTechnician": "Shahrukh Master Technician",
    "bay": "Bay 02 - Precision Engine Overhaul Bay",
    "workBayStream": {
      "streamId": "STREAM-BAY02-CAM1",
      "status": "LIVE",
      "resolution": "1080p @ 60FPS (Ultra-Low Latency WebRTC)",
      "latencyMs": 142,
      "cameraViews": [
        {
          "id": "cam_overhead",
          "label": "Engine Overhead Cam",
          "active": true
        },
        {
          "id": "cam_macro",
          "label": "Cylinder Head Macro Cam",
          "active": false
        },
        {
          "id": "cam_bay",
          "label": "Wide Bay Cam",
          "active": false
        }
      ]
    },
    "stages": [
      {
        "step": 1,
        "title": "Vehicle Inspection & OBD-II Full Scan",
        "status": "completed",
        "timestamp": "Today 10:15 AM",
        "notes": "OBD-II ECU scan clear. Spark plug gap inspected at 0.8mm."
      },
      {
        "step": 2,
        "title": "Engine Disassembly & Valve Inspection",
        "status": "in_progress",
        "progressPercent": 65,
        "timestamp": "Today 11:30 AM",
        "notes": "Cam chain tensioner removed. Checking intake valve clearance."
      },
      {
        "step": 3,
        "title": "Valve Lapping, Bore Honing & Part Replacement",
        "status": "pending",
        "progressPercent": 0,
        "timestamp": "Estimated 02:00 PM",
        "notes": "New Viton stem seals and piston rings staged for installation."
      },
      {
        "step": 4,
        "title": "Final Washing, Teflon Polish & Dyno Road Test",
        "status": "pending",
        "progressPercent": 0,
        "timestamp": "Estimated 04:30 PM",
        "notes": "High-pressure foam wash and 5 KM electronic diagnostic test run."
      }
    ],
    "customerNotes": [
      {
        "id": "cn_01",
        "text": "Brake pad sound check kar lena bhaiyya front disc mein se",
        "timestamp": "11:42 AM",
        "status": "Acknowledged by Technician"
      }
    ]
  }
]
};

// Global Universal Fetch Wrapper with Automatic Offline / GitHub Pages Fallback
window.ccFetch = async function(endpoint, options = {}) {
  try {
    const res = await fetch(endpoint, options);
    if (res.ok) return await res.json();
    throw new Error('Server returned ' + res.status);
  } catch (err) {
    // Offline / GitHub Pages static fallback handling
    console.log('[CC CLIENT-DB] Using client-side fallback for:', endpoint);
    const method = (options.method || 'GET').toUpperCase();
    const body = options.body ? JSON.parse(options.body) : {};

    if (endpoint.includes('/api/config')) {
      return window.CC_DATA.config;
    }
    if (endpoint.includes('/api/portfolio')) {
      return window.CC_DATA.portfolio;
    }
    if (endpoint.includes('/api/bookings')) {
      if (method === 'POST') {
        window.CC_DATA.bookings.unshift(body);
        return { success: true, booking: body };
      }
      return window.CC_DATA.bookings;
    }
    if (endpoint.includes('/api/partners')) {
      return window.CC_DATA.partners;
    }
    if (endpoint.includes('/api/customers/search')) {
      const q = (endpoint.split('?q=')[1] || '').toLowerCase().replace(/\s+/g, '');
      const match = window.CC_DATA.customers.filter(c => 
        c.mobile.includes(q) || c.regNumber.toLowerCase().replace(/\s+/g, '').includes(q)
      );
      return match.length > 0 ? match : window.CC_DATA.customers;
    }
    if (endpoint.includes('/api/job-cards')) {
      return window.CC_DATA.jobCards[0];
    }
    if (endpoint.includes('/api/obd/diagnose')) {
      const query = (body.query || '').toUpperCase();
      const found = window.CC_DATA.obd.find(o => query.includes(o.code));
      if (found) {
        return { found: true, result: found };
      }
      return {
        found: false,
        diagnosticSummary: "HTS AI Diagnostic Analysis for [" + query + "]: 25-Year Engine Lab Protocol",
        recommendedChecks: [
          "1. Multimeter Battery Load Test: 12.6V static, > 10.5V cranking drop limit",
          "2. Spark Ignition Probe: Blue crisp spark gap > 8mm under 1 ATM",
          "3. Valve Tappet Clearance: Intake 0.08-0.10mm, Exhaust 0.12-0.15mm cold"
        ],
        masterWisdom: "Ustad advice: Pehle wiring harness ground check karo. 70% fault codes loose ground ki wajah se aate hain!"
      };
    }
    if (endpoint.includes('/api/obd/analyze-sound')) {
      return {
        success: true,
        acousticTelemetry: {
          frequency: "1.2 kHz - 2.4 kHz Metallic Ticking",
          rpmCorrelation: "1:2 Camshaft speed frequency",
          identifiedFault: "Loose Valve Tappet / Excessive Valve Clearance",
          severity: "Moderate - Loss of peak volumetric efficiency",
          recommendedAction: "Feeler gauge valve lash calibration (Intake: 0.08mm, Exhaust: 0.14mm)."
        }
      };
    }
    if (endpoint.includes('/api/auth/validate-passcode')) {
      const code = (body.passcode || '').trim();
      if (code === 'cc105') {
        return { success: true, role: "partner", targetPortal: "partner_dashboard" };
      } else if (code === 'cc1005') {
        return { success: true, role: "customer", targetPortal: "customer_portal" };
      } else if (code === 'cc102') {
        return { success: true, role: "admin", targetPortal: "admin_master_dashboard" };
      } else {
        return {
          success: false,
          triggerHoldProtocol: true,
          displayNotice: "Security Notice: System detecting active device session check... Your request has been securely routed to CC Motocrafts Central Verification Desk. Due to heavy diagnostic volume, your device token is currently placed on temporary security hold. Our team will verify and dispatch your dynamic access code via Email, SMS, or WhatsApp shortly. Please do not refresh."
        };
      }
    }
    if (endpoint.includes('/api/auth/security-hold')) {
      return {
        success: true,
        displayNotice: "Security Notice: System detecting active device session check... Your request has been securely routed to CC Motocrafts Central Verification Desk. Due to heavy diagnostic volume, your device token is currently placed on temporary security hold. Our team will verify and dispatch your dynamic access code via Email, SMS, or WhatsApp shortly. Please do not refresh."
      };
    }
    if (endpoint.includes('/api/auth/dispatch-otp')) {
      return {
        success: true,
        message: "Aapke Mobile, Email aur WhatsApp par verification password send kar diya gaya hai.",
        simulatedOtpForDemo: "884102"
      };
    }
    if (endpoint.includes('/api/auth/verify-otp')) {
      return { success: true, verified: true };
    }
    if (endpoint.includes('/api/invoices/create')) {
      return {
        success: true,
        invoice: {
          invoiceNo: "CCM-INV-2024-" + Math.floor(1000 + Math.random() * 9000),
          partnerName: "Harish CC Motocrafts Hub",
          date: new Date().toISOString().split('T')[0],
          customer: body.customer || { name: "Syed Farhan", mobile: "+91 9849112233", vehicleModel: "KTM Duke 390", regNumber: "TS 09 EA 1234" },
          items: body.items || [],
          isGst: body.isGst,
          subTotal: 5430,
          cgst: body.isGst ? 488.70 : 0,
          sgst: body.isGst ? 488.70 : 0,
          grandTotal: body.isGst ? 6407.40 : 5430
        }
      };
    }
    return { success: true };
  }
};
