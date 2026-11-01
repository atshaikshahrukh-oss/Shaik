/**
 * CC MOTOCRAFTS ENTERPRISE PLATFORM CONFIGURATION
 * Official System Constants, Credentials, and Business Rules
 */

module.exports = {
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
    partnerPasscode: "cc105",      // Partner Garage & Technician Dashboard
    customerPasscode: "cc1005",   // Customer Live Tracking & Job Card
    masterAdminPasscode: "cc102",  // Master Central Admin Override
    sessionTimeoutMs: 8 * 60 * 60 * 1000 // 8 hours
  },

  modes: {
    twoWheeler: {
      id: "2w",
      brandTitle: "CC Motocrafts AI Engine Labs Service",
      capacityRange: "100cc to 2,500cc",
      categories: ["Scooters", "Commuter Motorcycles", "CVT Automatoids", "Sports & Superbikes"],
      themeColor: "#00e5ff",
      bgGradient: "linear-gradient(135deg, #09121d 0%, #03080e 100%)"
    },
    fourWheeler: {
      id: "4w",
      brandTitle: "CarS CareS Motocrafts AI Engine Labs Service",
      capacityRange: "500cc to 15,000cc",
      categories: ["Sedans", "SUVs", "Luxury Performance", "Commercial & Fleet Haulers"],
      themeColor: "#ff9100",
      bgGradient: "linear-gradient(135deg, #181005 0%, #080502 100%)"
    }
  },

  businessRules: {
    cancellationFee: 300,
    doorstepPickup: {
      freeRadiusKm: 20,
      centerLocation: "Gachibowli, Hyderabad",
      vipPincodes: [
        "500032", "500081", "500084", "500089", "500033", 
        "500075", "500019", "500090", "500049", "500046"
      ]
    },
    warrantyTerms: {
      generalService: {
        durationDays: 30,
        coverage: "30 Days Working Guarantee on tuned components and labor workmanship"
      },
      engineRebuild: {
        durationMonths: 12,
        coverage: "1-Year Warranty covering Crankshaft, Cylinder Bore Kit, and Valve Manufacturing Defects",
        exclusions: ["Brake Pads", "Clutch Plates", "Drive Belts", "Air/Oil Filters", "Consumables"],
        mandatoryFirstService: {
          minKm: 500,
          maxKm: 750,
          minDays: 15,
          maxDays: 30,
          warning: "Strict First Engine Service required between 500-750 KM (15-30 days). Failure voids 1-Year Warranty."
        },
        routineMaintenanceInterval: {
          minKm: 1800,
          maxKm: 2000,
          minDays: 45,
          maxDays: 60,
          warning: "Routine checkup and oil service mandatory every 1,800-2,000 KM (45-60 days) to keep overhaul warranty active."
        }
      }
    }
  }
};
