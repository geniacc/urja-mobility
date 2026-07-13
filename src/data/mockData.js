export const categories = [
  {
    id: "automotive",
    title: "Mobility Batteries",
    tagline: "Powering the Move",
    externalLink: "https://zuice.in/",
    description: "High-performance Li-Ion batteries for the future of transportation.",
    color: "#ef4444", // Red
    image: import.meta.env.BASE_URL + "assets/tuk-tuk.png",
    subcategories: [
      {
        id: "3-wheeler",
        title: "3 Wheeler (E-Rickshaw)",
        items: [
          {
            id: "51v-105",
            title: "51.2V 105Ah LFP Battery Pack",
            desc: "51V Series E-Rickshaw",
            specs: "51.2V • 105Ah",
            details: {
              technical: {
                application: "Electric 3-Wheelers (L5 loaders/e-rickshaw), Energy storage systems",
                general: {
                  chemistry: "Lithium Iron Phosphate (LiFePO₄)",
                  nominalVoltage: "51.2V (16S configuration)",
                  nominalCapacity: "105Ah",
                  nominalEnergy: "~5.37 kWh (5376 Wh)"
                },
                electrical: {
                  nominalVoltage: "51.2V (16 cells in series, 3.2V each)",
                  nominalCapacity: "105Ah ± 2%",
                  nominalEnergy: "~5376 Wh",
                  operatingVoltageRange: "44.8V – 58.4V",
                  roundTripEfficiency: "≥ 95%",
                  internalResistance: "≤ 50 mΩ"
                },
                bms: {
                  type: "JBD, Daly, Superpower",
                  voltageProtection: "Cell voltage monitoring & balancing, Over-voltage / under-voltage protection",
                  currentProtection: "Over-charge / over-discharge protection, Over-current protection (charge & discharge), Short-circuit protection",
                  thermalProtection: "Over-temperature & under-temperature protection, Thermal runaway prevention",
                  redundancyAndFailSafes: "Emergency cut-off",
                  communication: [
                    "CAN bus (ISO 11898)",
                    "RS485 / UART",
                    "Bluetooth",
                    "IoT",
                    "Diagnostic software support"
                  ]
                },
                mechanical: {
                  dimensions: "56(cm) x 36.2(cm) x 26.7(cm) (Length x Width x Height)",
                  enclosureMaterial: "Powder-coated steel / Aluminum alloy",
                  ipRating: "IP67 (dustproof & waterproof)",
                  connector: "SB-50/SB-75"
                }
              }
            }
          },
          {
            id: "51v-230",
            title: "51V 230AH",
            desc: "51V Series E-Rickshaw",
            specs: "51.2V • 230AH",
            details: {
              technical: {
                application: "Electric 3-Wheelers (L5 loaders/e-rickshaw), Energy storage systems",
                general: {
                  chemistry: "Lithium Iron Phosphate (LiFePO₄)",
                  packMethod: "16S1P",
                  nominalVoltage: "51.2V",
                  nominalCapacity: "230Ah",
                  nominalEnergy: "11.77 kWh"
                },
                electrical: {
                  nominalVoltage: "51.2V",
                  nominalCapacity: "230Ah",
                  nominalEnergy: "11.77 kWh",
                  operatingVoltageRange: "44.8V - 58.4V",
                  chargingMethod: "CC/CV",
                  standardChargeCurrent: "15A-30A",
                  maxContinuousCharge: "100A",
                  maxContinuousDischarge: "≤ 200A",
                  peakDischargeCurrent: "≤ 300A (up to 10 Sec.)",
                  cutOffDischargeVoltage: "44.8V"
                },
                cell: {
                  cycleLife: "3000 cycles @ 25°C"
                },
                bms: {
                  type: "JBD, Daly, Superpower",
                  voltageProtection: "Cell voltage monitoring, Over-voltage protection",
                  currentProtection: "Over-current protection, Short-circuit protection (400A)",
                  thermalProtection: "Over-temperature & under-temperature protection, Thermal runaway prevention",
                  redundancyAndFailSafes: "Emergency cut-off",
                  communication: ["BLE", "RS485", "CAN"]
                },
                mechanical: {
                  dimensions: "560 x 362 x 267 mm",
                  weight: "~82 kgs",
                  enclosureMaterial: "Powder-coated steel / Aluminum alloy",
                  ipRating: "IP-67",
                  connector: "SB-75/SB-175"
                },
                environmental: {
                  operatingTempCharge: "0°C - 55°C",
                  operatingTempDischarge: "0°C - 55°C",
                  storageTemperature: "0°C - 50°C"
                }
              }
            }
          },
          {
            id: "64v-105",
            title: "64V 105Ah LFP Battery Pack",
            desc: "64V Series E-Rickshaw",
            specs: "64V • 105Ah",
            details: {
              technical: {
                application: "Electric 3-Wheelers (L5 loaders/e-rickshaw), Energy storage systems",
                general: {
                  chemistry: "Lithium Iron Phosphate (LiFePO₄)",
                  nominalVoltage: "64V (Pending series configuration)",
                  nominalCapacity: "105Ah",
                  nominalEnergy: "~6.72 kWh (6720 Wh)"
                },
                electrical: {
                  nominalVoltage: "64V",
                  nominalCapacity: "105Ah ± 2%",
                  nominalEnergy: "~6720 Wh"
                },
                bms: {
                  type: "JBD, Daly, Superpower",
                  voltageProtection: "Cell voltage monitoring & balancing, Over-voltage / under-voltage protection",
                  currentProtection: "Over-charge / over-discharge protection, Over-current protection (charge & discharge), Short-circuit protection",
                  thermalProtection: "Over-temperature & under-temperature protection, Thermal runaway prevention",
                  redundancyAndFailSafes: "Emergency cut-off",
                  communication: [
                    "CAN bus (ISO 11898)",
                    "RS485 / UART",
                    "Bluetooth",
                    "IoT",
                    "Diagnostic software support"
                  ]
                },
                mechanical: {
                  dimensions: "56(cm) x 36.2(cm) x 26.7(cm) (Length x Width x Height)",
                  enclosureMaterial: "Powder-coated steel / Aluminum alloy",
                  ipRating: "IP67 (dustproof & waterproof)"
                }
              }
            }
          },
          {
            id: "51v-100ah",
            title: "51.2V 100Ah Lithium Iron Phosphate (LiFePO₄) Battery Pack",
            desc: "The Powerhouse for Next-Gen Electric 3-Wheelers & Energy Storage",
            specs: "51.2V • 100Ah",
            details: {
              technical: {
                application: "Electric 3-Wheelers (L5 loaders/e-rickshaw), Energy storage systems",
                general: {
                  chemistry: "Lithium Iron Phosphate (LiFePO₄)",
                  nominalVoltage: "51.2V (16S configuration)",
                  nominalCapacity: "100Ah",
                  nominalEnergy: "~5.12 kWh"
                },
                electrical: {
                  nominalVoltage: "51.2V (16 cells in series, 3.2V each)",
                  nominalCapacity: "100Ah ± 2%",
                  nominalEnergy: "~5120 Wh",
                  operatingVoltageRange: "44.8V – 58.4V",
                  recommendedChargeVoltage: "58.4V",
                  cutOffDischargeVoltage: "44.8V",
                  standardChargeCurrent: "0.5C (50A)",
                  maxContinuousCharge: "1C (100A)",
                  standardDischargeCurrent: "0.5C (50A)",
                  maxContinuousDischarge: "1C (100A)",
                  peakDischargeCurrent: "2C (200A, 10 sec)",
                  roundTripEfficiency: "≥ 95%",
                  internalResistance: "≤ 50 mΩ"
                },
                cell: {
                  cellType: "Prismatic LFP cells",
                  capacityPerCell: "100Ah (3.2V nominal)",
                  cycleLife: "≥ 3000 cycles @ 80% DoD, 25°C",
                  calendarLife: "≥ 7 years"
                },
                bms: {
                  type: "JBD, Daly, Superpower",
                  voltageProtection: "Cell voltage monitoring & balancing, Over-voltage / under-voltage protection",
                  currentProtection: "Over-charge / over-discharge protection, Over-current protection (charge & discharge), Short-circuit protection",
                  thermalProtection: "Over-temperature & under-temperature protection, Thermal runaway prevention",
                  redundancyAndFailSafes: "Emergency cut-off",
                  communication: [
                    "CAN bus (ISO 11898)",
                    "RS485 / UART",
                    "Bluetooth",
                    "IoT",
                    "Diagnostic software support"
                  ]
                },
                mechanical: {
                  dimensions: "56(cm) x 36.2(cm) x 26.7(cm) (Length x Width x Height)",
                  weight: "≤ 45–50 kg",
                  enclosureMaterial: "Powder-coated steel / Aluminum alloy",
                  ipRating: "IP67 (dustproof & waterproof)",
                  connector: "SB-50/SB-75",
                  coolingMethod: "Passive (air-cooled), provision for fan slot",
                  mounting: "Vehicle chassis / stationary rack mount"
                },
                environmental: {
                  operatingTempCharge: "0°C to +55°C",
                  operatingTempDischarge: "-20°C to +60°C",
                  storageTemperature: "-10°C to +45°C",
                  humidity: "≤ 95% RH non-condensing",
                  altitude: "≤ 2000m"
                }
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: "ev-charger",
    title: "Advanced Chargers",
    tagline: "Next-Gen Charging Solutions",
    externalLink: "https://zuice.in/",
    description: "Cutting-edge charging solutions for the electric future.",
    color: "#10b981", // Emerald
    image: import.meta.env.BASE_URL + "assets/TK3000W.png",
    subcategories: [
      {
        id: 'lithium-ev-chargers',
        title: 'Urja Lithium Chargers',
        items: [
          {
            id: 'urja-charger-400w',
            title: 'Urja Mobility 400W Lithium Battery Charger',
            image: import.meta.env.BASE_URL + "assets/urja-400w-1.jpg.jpeg",
            details: {
              gallery: [
                import.meta.env.BASE_URL + "assets/urja-400w-1.jpg.jpeg",
                import.meta.env.BASE_URL + "assets/urja-400w-2.jpg.jpeg",
                import.meta.env.BASE_URL + "assets/urja-400w-3.jpg.jpeg",
                import.meta.env.BASE_URL + "assets/urja-400w-4.jpg.jpeg"
              ],
              technical: {
                general: {
                  application: "Optimized for 2-wheeler E-Vehicles using LFP, NCM, or NCA chemistry battery packs (13S to 19S).",
                  coolingSystem: "Forced Air Cooled (Internal fan turns on with increased current/temperature)",
                  protections: "Electronic Reverse Polarity, Mains High Voltage (up to 320VAC RMS), Mains Over Current (Fuse), Electronic Thermal Protection",
                  nominalVoltage: "Max CV: 58V",
                  outputCapacity: "Max CC: 6A",
                  nominalEnergy: "400W MAX",
                  operatingTemperature: "0°C TO 45°C",
                  humidity: "95% RH Non-Condensing"
                },
                electrical: {
                  mainsInput: "150VAC - 280VAC ±10V (40 Hz TO 60 Hz)",
                  maxInputCurrent: "2A (Output de-rated at low mains to limit input current)",
                  efficiency: "91% Typical",
                  visualIndication: "LED Based (Mains, Battery Bar Graph, Faults)"
                },
                mechanical: {
                  enclosure: "Powder coated sheet metal cabinet",
                  dimensions: "200mm x 135mm x 70mm",
                  weight: "1.7 kg",
                  batteryCable: "1.3m, 1.5sqmm, Insulated 2 Core Cable with IEC C13 Connector",
                  mainsCable: "1.5m, 0.50sqmm 3core ISI Marked Cable With 6A Plug"
                }
              }
            }
          },
          {
            id: 'urja-charger-1000w',
            title: 'Urja Mobility 1000W Lithium Battery Charger',
            image: import.meta.env.BASE_URL + "assets/urja-1000w-1.jpg.jpeg",
            details: {
              gallery: [
                import.meta.env.BASE_URL + "assets/urja-1000w-1.jpg.jpeg",
                import.meta.env.BASE_URL + "assets/urja-1000w-2.jpg.jpeg",
                import.meta.env.BASE_URL + "assets/urja-1000w-3.jpg.jpeg",
                import.meta.env.BASE_URL + "assets/urja-1000w-4.jpg.jpeg"
              ],
              technical: {
                general: {
                  application: "AIS 156 II Complied charger for Light E-Vehicles. Features Pre-Charge and Soft-Start for deep discharged batteries (13S to 24S).",
                  coolingSystem: "Forced Air Cooled",
                  protections: "Reverse Polarity, Mains High Voltage, Over Current, Thermal",
                  nominalVoltage: "Max CV: 58V",
                  outputCapacity: "Max CC: 16A",
                  nominalEnergy: "1000W MAX",
                  chargeTermination: "CV Current < 3A for 15 Min OR CV Time Exceeds 1Hr 50Min OR Total Time Exceeds 7 Hrs",
                  preChargeSetting: "Below 75% CV: Limited to CC/4. Below 33V: Limited to 2.0A",
                  canInterface: "Optional ISO11898 CAN 2.0B Interface"
                },
                electrical: {
                  mainsInput: "115VAC - 280VAC ±10V (40 Hz TO 60 Hz)",
                  maxInputCurrent: "4.5A",
                  efficiency: "91% Typical",
                  powerFactor: "Active PF correction, PF>0.98, ITHD < 5%",
                  softStartRate: "Current Rise rate 1.0A/Sec typical (0 to 16A in 16 Seconds)"
                },
                mechanical: {
                  enclosure: "Powder coated sheet metal cabinet",
                  dimensions: "290mm x 135mm x 105mm",
                  weight: "3.2 kg",
                  batteryCable: "1.3m, 4sqmm, Insulated 2 Core Cable With Anderson SB50 Or SB75x",
                  mainsCable: "1.8m, 1sqmm 3core ISI Marked Cable With 6A Plug"
                }
              }
            }
          },
          {
            id: 'urja-charger-1200w',
            title: 'Urja Mobility 1200W Lithium Battery Charger',
            image: import.meta.env.BASE_URL + "assets/urja-1200w-1.jpg.jpeg",
            details: {
              gallery: [
                import.meta.env.BASE_URL + "assets/urja-1200w-1.jpg.jpeg",
                import.meta.env.BASE_URL + "assets/urja-1200w-2.jpg.jpeg",
                import.meta.env.BASE_URL + "assets/urja-1200w-3.jpg.jpeg",
                import.meta.env.BASE_URL + "assets/urja-1200w-4.jpg.jpeg"
              ],
              technical: {
                general: {
                  application: "AIS 156 II Complied high-efficiency charger for Light E-Vehicles. Compatible with 8S to 24S Lithium packs.",
                  coolingSystem: "Forced Air Cooled",
                  protections: "Reverse Polarity, Mains High Voltage, Over Current, Thermal",
                  nominalVoltage: "Max CV: 58V",
                  outputCapacity: "Max CC: 22A",
                  nominalEnergy: "1200W MAX",
                  chargeTermination: "CV Current < 3A for 15 Min OR CV Time Exceeds 1Hr 50Min OR Total Time Exceeds 7 Hrs",
                  canInterface: "Optional ISO11898 CAN 2.0B Interface"
                },
                electrical: {
                  mainsInput: "115VAC - 280VAC ±10V (40 Hz TO 60 Hz)",
                  maxInputCurrent: "7.5A",
                  efficiency: "91% Typical",
                  powerFactor: "Active PF correction, PF>0.98, ITHD < 5%",
                  softStartRate: "Current Rise rate 1.3A/Sec typical (0 to 22A in 17 Seconds)"
                },
                mechanical: {
                  enclosure: "Powder coated sheet metal cabinet",
                  dimensions: "300mm x 145mm x 95mm",
                  weight: "3.2 kg",
                  batteryCable: "1.3m, 4sqmm, Insulated 2 Core Cable With Anderson SB50 Or SB75x",
                  mainsCable: "1.8m, 1sqmm 3core ISI Marked Cable With 16A Plug"
                }
              }
            }
          },
          {
            id: 'urja-charger-2400w',
            title: 'Urja Mobility 2400W Lithium Battery Charger',
            image: import.meta.env.BASE_URL + "assets/urja-2400w-1.jpg.jpeg",
            details: {
              gallery: [
                import.meta.env.BASE_URL + "assets/urja-2400w-1.jpg.jpeg",
                import.meta.env.BASE_URL + "assets/urja-2400w-2.jpg.jpeg",
                import.meta.env.BASE_URL + "assets/urja-2400w-3.jpg.jpeg",
                import.meta.env.BASE_URL + "assets/urja-2400w-4.jpg.jpeg"
              ],
              technical: {
                general: {
                  application: "AIS 156 II Complied heavy-duty charger for 60AH-200AH packs (13S to 24S). Features 4-stage profile and LCD Interface.",
                  coolingSystem: "Forced Air Cooled",
                  protections: "Reverse Polarity, Mains High Voltage, Over Current, Thermal",
                  nominalVoltage: "Configurable 48V to 84V",
                  outputCapacity: "Configurable 15A to 40A",
                  nominalEnergy: "2400W MAX",
                  userInterface: "LCD Display Panel with Menu/Up/Down buttons, 2 Status LEDs",
                  canInterface: "Configurable through CAN Communication Interface"
                },
                electrical: {
                  mainsInput: "115VAC - 280VAC ±10V (40 Hz TO 60 Hz)",
                  maxInputCurrent: "15A",
                  efficiency: "90% Typical",
                  powerFactor: "Active PF correction, PF>0.98, ITHD < 5%",
                  softStartRate: "Current Rise rate 2.6A/Sec typical (0 to Maximum Set Current)",
                  preChargeSetting: "Below 40V: Limited to CC/4. Below 33V: Limited to 2.0A"
                },
                mechanical: {
                  enclosure: "Powder coated sheet metal cabinet",
                  dimensions: "350mm x 270mm x 95mm",
                  weight: "6.7 kg",
                  batteryCable: "2Mtr 6Sqmm with SB75X/SB50 equivalent connector",
                  mainsCable: "1.5m, 1.5sqmm 3core ISI Marked Cable With 16A Plug"
                }
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: "inverter",
    title: "Inverter",
    tagline: "Smart Power Conversion",
    externalLink: "https://zuice.in/",
    description: "High-efficiency inverters for seamless solar and grid integration.",
    color: "#f97316", // Orange
    image: import.meta.env.BASE_URL + "assets/Single Phase Solar GTI.png",
    subcategories: [
      {
        id: "solar-ups",
        title: "Solar UPS",
        items: [
          {
            id: "solar-ups-850va-12v",
            title: "850VA 12V Solar UPS",
            desc: "850VA 12V Solar UPS",
            specs: "850VA",
            details: {
              technical: {
                general: {
                  capacity: "850VA",
                  systemVoltage: "12V",
                  batterySupport: "Lithium Battery Compatible"
                },
                electrical: {
                  outputVoltageNoLoad: "220V ± 7V",
                  outputVoltageFullLoad: "195V – 220V",
                  outputFrequency: "50Hz ± 1 Hz",
                  transferTimeUPS: "≤ 10 ms",
                  transferTimeNormal: "≤ 40 ms"
                },
                solar: {
                  mainsChargingCurrent: "16A ± 1A",
                  solarChargingCurrent: "16A ± 1A",
                  boostChargingVoltage: "14.4V ± 0.2V"
                },
                bms: {
                  voltageProtection: "Battery Low Alarm (11.3V) & Shutdown (11.0V)",
                  currentProtection: "Overload (>61 Amp, 6 retries), PV Reverse Polarity via terminal block",
                  thermalProtection: "Over-temperature (104°C ± 5°C)",
                  electricalIsolation: "Yes",
                  redundancyAndFailSafes: ""
                }
              }
            }
          },
          {
            id: "dsp-solar-hybrid-ups-300va",
            title: "300VA DSP Solar Hybrid UPS",
            desc: "DSP Solar Hybrid UPS",
            specs: "300VA",
            details: {
              technical: {
                general: {
                  capacity: "300VA",
                  technology: "Digital Signal Processor (DSP) Based",
                  systemVoltage: "12V"
                },
                electrical: {
                  waveform: "Pure Sine Wave",
                  inputVoltageNormal: "100Vac - 280Vac",
                  inputVoltageUPS: "170Vac - 260Vac",
                  outputVoltage: "230V ± 10V",
                  outputVoltageNoLoad: "220V ± 7V",
                  outputVoltageFullLoad: "195V – 220V",
                  outputFrequency: "50Hz ± 0.1Hz",
                  loadPowerFactor: "0.8PF",
                  transferTimeUPS: "≤ 10 ms",
                  transferTimeNormal: "≤ 40 ms"
                },
                solar: {
                  chargerTopology: "PWM based smart charging",
                  mainsChargingCurrent: "6A ± 2A",
                  boostChargingVoltage: "14.3V ± 0.2V",
                  maxSolarCurrent: "10A",
                  maxSolarWattage: "100W"
                },
                bms: {
                  voltageProtection: "Battery Over/Low Voltage & Deep Discharge",
                  currentProtection: "Short Circuit (> 300% Load), Overload (Above 105%), PV Reverse Polarity",
                  thermalProtection: "Over Temperature (Auto Recovery)",
                  electricalIsolation: "Yes",
                  redundancyAndFailSafes: ""
                }
              }
            }
          },
          {
            id: "dsp-solar-hybrid-ups-1000va",
            title: "1000VA DSP Solar Hybrid UPS",
            desc: "DSP Solar Hybrid UPS",
            specs: "1000VA",
            details: {
              technical: {
                general: {
                  capacity: "1000VA",
                  technology: "Digital Signal Processor (DSP) Based",
                  systemVoltage: "12V"
                },
                electrical: {
                  waveform: "Pure Sine Wave",
                  inputVoltageNormal: "100Vac - 280Vac",
                  inputVoltageUPS: "170Vac - 260Vac",
                  outputVoltage: "230V ± 10V",
                  outputFrequency: "50Hz ± 0.1Hz",
                  loadPowerFactor: "0.8PF"
                },
                solar: {
                  chargerTopology: "PWM based smart charging",
                  mainsChargingCurrent: "15A ± 2A",
                  boostChargingVoltage: "14.3V ± 0.2V",
                  maxSolarCurrent: "40A",
                  maxSolarWattage: "Up to 680W"
                },
                bms: {
                  voltageProtection: "Battery Over/Low Voltage & Deep Discharge",
                  currentProtection: "Short Circuit (> 300% Load), Overload (Above 105%), PV Reverse Polarity",
                  thermalProtection: "Over Temperature (Auto Recovery)",
                  electricalIsolation: "Yes",
                  redundancyAndFailSafes: ""
                }
              }
            }
          },
          {
            id: "solar-ups-1050va",
            title: "1050VA Solar UPS",
            desc: "Solar UPS",
            specs: "1050VA",
            details: {
              technical: {
                general: {
                  capacity: "1050VA",
                  systemVoltage: "Pending",
                  batterySupport: "Pending"
                },
                electrical: {
                  outputVoltageNoLoad: "Pending",
                  outputVoltageFullLoad: "Pending",
                  outputFrequency: "Pending",
                  transferTimeUPS: "Pending",
                  transferTimeNormal: "Pending"
                },
                solar: {
                  mainsChargingCurrent: "Pending",
                  solarChargingCurrent: "Pending",
                  boostChargingVoltage: "Pending"
                },
                bms: {
                  voltageProtection: "",
                  currentProtection: "",
                  thermalProtection: "",
                  electricalIsolation: "Yes",
                  redundancyAndFailSafes: ""
                }
              }
            }
          },
          {
            id: "dsp-solar-hybrid-ups-2000va-24v",
            title: "2000VA (2KVA) 24V DSP Solar Hybrid UPS",
            desc: "DSP Solar Hybrid UPS",
            specs: "2000VA • 24V",
            details: {
              technical: {
                general: {
                  capacity: "2000VA",
                  systemVoltage: "24V",
                  technology: "Digital Signal Processor (DSP) Based"
                },
                electrical: {
                  waveform: "Pure Sine Wave",
                  inputVoltageNormal: "100Vac - 280Vac",
                  inputVoltageUPS: "170Vac - 260Vac",
                  outputVoltage: "230V ± 10V",
                  outputVoltageNoLoad: "220V ± 7V",
                  outputVoltageFullLoad: "180V – 220V",
                  outputFrequency: "50Hz ± 0.1Hz",
                  loadPowerFactor: "0.8PF",
                  transferTimeUPS: "≤ 10 ms",
                  transferTimeNormal: "≤ 40 ms"
                },
                solar: {
                  chargerTopology: "PWM based smart charging",
                  mainsChargingCurrent: "15A ± 2A",
                  boostChargingVoltage: "28.6V ± 0.2V",
                  maxSolarCurrent: "40A",
                  maxSolarWattage: "1340W"
                },
                bms: {
                  voltageProtection: "Battery Over/Low Voltage & Deep Discharge",
                  currentProtection: "Short Circuit (> 300% Load), Overload (Above 105%), PV Reverse Polarity",
                  thermalProtection: "Over Temperature (Auto Recovery)",
                  electricalIsolation: "Yes",
                  redundancyAndFailSafes: ""
                }
              }
            }
          },
          {
            id: "dsp-solar-hybrid-ups-3000va",
            title: "3000VA DSP Solar Hybrid UPS",
            desc: "DSP Solar Hybrid UPS",
            specs: "3000VA",
            details: {
              technical: {
                general: {
                  capacity: "3000VA",
                  technology: "Digital Signal Processor (DSP) Based",
                  systemVoltage: "48V"
                },
                electrical: {
                  waveform: "Pure Sine Wave",
                  inputVoltageNormal: "100Vac - 280Vac",
                  inputVoltageUPS: "170Vac - 260Vac",
                  outputVoltage: "230V ± 10V",
                  outputFrequency: "50Hz ± 0.1Hz",
                  loadPowerFactor: "0.8PF"
                },
                solar: {
                  chargerTopology: "PWM based smart charging",
                  mainsChargingCurrent: "15A ± 2A",
                  boostChargingVoltage: "57.2V ± 0.4V",
                  maxSolarCurrent: "40A",
                  maxSolarWattage: "2680W"
                },
                bms: {
                  voltageProtection: "Battery Over/Low Voltage & Deep Discharge",
                  currentProtection: "Short Circuit (> 300% Load), Overload (Above 105%), PV Reverse Polarity",
                  thermalProtection: "Over Temperature (Auto Recovery)",
                  electricalIsolation: "Yes",
                  redundancyAndFailSafes: ""
                }
              }
            }
          },
          {
            id: "mppt-inverter-24v",
            title: "24V MPPT Solar Inverter",
            desc: "MPPT Solar Inverter",
            specs: "24V MPPT",
            details: {
              technical: {
                general: {
                  type: "24V MPPT Solar Inverter",
                  systemVoltage: "24V",
                  application: "Solar Charging / Inverter"
                },
                electrical: {
                  waveform: "Pending",
                  inputVoltage: "Pending",
                  outputVoltage: "Pending",
                  outputFrequency: "Pending"
                },
                solar: {
                  mppt: "Pending",
                  maxSolarWattage: "Pending",
                  maxSolarCurrent: "Pending"
                },
                bms: {
                  voltageProtection: "Battery Over/Low Voltage & Deep Discharge Protection",
                  currentProtection: "Short Circuit (> 300% Load), Overload (Above 105%), PV Reverse Polarity",
                  thermalProtection: "Over Temperature (Auto Recovery)",
                  electricalIsolation: "Yes",
                  redundancyAndFailSafes: ""
                }
              }
            }
          }
        ]
      }
    ]
  }
];

export const teamMembers = [
  { id: 1, name: "PANKAJ CHOPRA", department: "MANAGEMENT", role: "FOUNDER DIRECTOR & CEO", image: import.meta.env.BASE_URL + "assets/Pankaj Sir.jpeg" },
  { id: 2, name: "BEEKEY KUMAR", department: "CREDIT", role: "DEPUTY GENERAL MANAGER - CREDIT", image: import.meta.env.BASE_URL + "assets/Beekey Kumar-Deputy General Manager- Credits.jpeg" },
  { id: 3, name: "ROHIT KUMAR", department: "SALES & SERVICE", role: "AFTER SALES SERVICE MANAGER(BIHAR &JKD)", image: import.meta.env.BASE_URL + "assets/Rohit Kumar-After Sales Service Manager.jpeg" },
  { id: 4, name: "ANAGH OJHA", department: "MANAGEMENT", role: "CO-FOUNDER-DIRECTOR & CTO", image: import.meta.env.BASE_URL + "assets/Anagh sir.jpeg" },
  { id: 5, name: "SURAJ SHARMA", department: "COLLECTION", role: "ASSISTANT MANAGER- FIELD & COLLECTION OPERATIONS", image: import.meta.env.BASE_URL + "assets/Suraj Sharma- ASSISTANT MANAGER- FIELD & COLLECTION OPERATIONS.jpeg" },
  { id: 6, name: "PUSHPESH KUMAR SHARMA", department: "TECHNICAL", role: "HEAD - R&D, SERVICE AND NEW PRODUCT DEVELOPMENT", image: import.meta.env.BASE_URL + "assets/PUSHPESH KUMAR SHARMA-HEAD - R&D, SERVICE AND NEW PRODUCT DEVELOPMENT.jpeg" },
  { id: 7, name: "ASHUTOSH KUMAR", department: "SUPPLY CHAIN", role: "SUPPLY CHAIN ENGINEER", image: import.meta.env.BASE_URL + "assets/Ashutosh Kumar (Supply Chain Engineer).jpeg" },
  { id: 8, name: "VICKY", department: "ADMIN", role: "LAB ASSOCIATE", image: import.meta.env.BASE_URL + "assets/Vicky Paswan- Lab Associate.jpeg" },
  { id: 9, name: "RITU", department: "CUSTOMER SUPPORT", role: "EXECUTIVE- OPERATIONS & SUPPORT", image: import.meta.env.BASE_URL + "assets/Ritu-Executive-Operations & Support.jpeg" },
  { id: 10, name: "PAPAI ROY", department: "SALES & COLLECTION", role: "SALES & COLLECTION EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Papai Roy (Sales & Collection Executive).jpeg" },
  { id: 11, name: "SUMIT KUMAR", department: "ACCOUNTS", role: "SR ACCOUNTS EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Sumit- Sr. Accounts Excutive.jpeg" },
  { id: 12, name: "ANURAG SHARMA", department: "OPERATIONS", role: "ASST MANAGER OPERATIONS", image: import.meta.env.BASE_URL + "assets/Anurag Sharma-Assistant Manager Operations.jpg" },
  { id: 13, name: "ABHISHEK PRASAD", department: "COLLECTION", role: "COLLECTION EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Abhishek Prasad (Collection Executive).jpeg" },
  { id: 14, name: "ANKIT SINGH", department: "SALES & COLLECTION", role: "DRIVER ON-BOARDING & COLLECTION EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Ankit Singh.jpeg" },
  { id: 15, name: "ANJALI", department: "ACCOUNTS", role: "ACCOUNTS EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Anjali - Accounts Executive.jpeg" },
  { id: 16, name: "TAPAS BARMAN", department: "SALES & MARKETING", role: "SALES & MARKETING EXECUTIVE", image: "" },
  { id: 17, name: "BHARTI KUMARI", department: "CUSTOMER SUPPORT", role: "CUSTOMER SUPPORT EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Bharti Mishra- Customer Support Executive.jpeg" },
  { id: 18, name: "SOURAV DEY", department: "SALES & MARKETING", role: "SALES AND MARKETING EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Sourav Dey- Sales & Marketing Executive.jpg" },
  { id: 19, name: "SUJAL RATHORE", department: "HUMAN RESOURCE", role: "JUNIOR HR EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Sujal-Junior HR Executive.jpeg" },
  { id: 20, name: "AMIT BHADOURIYA", department: "COLLECTION", role: "COLLECTION EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Amit Bhadouriya - collection Executive.png" },
  { id: 21, name: "SHIVAM SINGH", department: "SALES & COLLECTION", role: "SALES & COLLECTION EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Shivam Singh.jpeg" },
  { id: 22, name: "DIPAM KAR", department: "SALES & COLLECTION", role: "SALES & COLLECTION EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Dipam Kar (Sales & Collection Executive).jpeg" },
  { id: 23, name: "RAHUL SINGH", department: "SALES & COLLECTION", role: "SALES & COLLECTION EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Rahul Singh- Sales & Collection Executive.jpeg" },
  { id: 24, name: "RAUSHAN KUMAR", department: "SUPPLY CHAIN", role: "DGM-SCM", image: import.meta.env.BASE_URL + "assets/RAUSHAN KUMAR (DGM-SCM).jpeg" },
  { id: 25, name: "MAHESH RAMDAS KADABA", department: "MANAGEMENT", role: "CHIEF STRATEGY OFFICER", image: import.meta.env.BASE_URL + "assets/Mahesh Ramdas Kadaba (Chief Strategy Officer).jpeg" },
  { id: 26, name: "SUBHASH CHAND", department: "TECHNICAL", role: "SERVICE TECHNICIAN", image: import.meta.env.BASE_URL + "assets/Subhash Chand- Service Technician.jpeg" },
  { id: 27, name: "SANJIT DEY", department: "SALES & COLLECTION", role: "SALES & COLLECTION EXECUTIVE", image: "" },
  { id: 28, name: "ROSHNI KUMARI", department: "DATA", role: "DATA ANALYST", image: "" },
  { id: 29, name: "PRAVINDRA KUMAR", department: "COLLECTION", role: "DEALER FI & COLLECTION SUPERVISOR", image: "" },
  { id: 30, name: "ANTUL RAKESH", department: "SUPPLY CHAIN", role: "VICE PRESIDENT- SUPPLY CHAIN MANAGEMENT", image: "" },
  { id: 31, name: "YAJUR CHOPRA", department: "FINANCE", role: "INVESTMENT ASSOCIATE", image: "" },
  { id: 32, name: "BANDANA KUMARI", department: "MANAGEMENT", role: "EXECUTIVE ASSISTANT TO CTO", image: "" },
  { id: 33, name: "PRAGYA", department: "HUMAN RESOURCE", role: "HR MANAGER", image: import.meta.env.BASE_URL + "assets/Pragya (HR Manager).jpeg" },
  { id: 34, name: "SUSHMITA KUMARI", department: "CREDIT", role: "CREDIT EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Sushmita Kumari- Credit Executive.jpeg" },
  { id: 35, name: "ASHISH KUMAR", department: "CREDIT", role: "CREDIT EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Ashish- Credit Executive.jpeg" },
  { id: 36, name: "PINKI", department: "CREDIT", role: "CREDIT EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Pinki- Credit Executive.jpeg" },
  { id: 37, name: "BHAWANA", department: "OPERATIONS", role: "OPERATION EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Bhawana - operations Executive.jpeg" },
  { id: 38, name: "SNEHA KHANDELWAL", department: "CREDIT", role: "CREDIT EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Sneha Khandelwal- Credit Executive.jpeg" },
  { id: 39, name: "JATIN SADANA", department: "CREDIT", role: "CREDIT MANAGER", image: "" },
  { id: 40, name: "KRISHNA", department: "ACCOUNTS", role: "SENIOR ACCOUNTS EXECUTIVE", image: import.meta.env.BASE_URL + "assets/Krishna-Senior Accounts Executive.jpeg" },
  { id: 41, name: "TWINKLE", department: "MANAGEMENT", role: "FOUNDER'S OFFICE", image: import.meta.env.BASE_URL + "assets/Twinkle- Founder's office.PNG" }
];

export const stats = [
  { value: "10,000+", label: "Batteries Deployed", progress: 80 },
  { value: "0.2%", label: "Annual Service Rate", progress: 95 },
  { value: "6+", label: "Operational Cities", progress: 35 },
  { value: "24/7", label: "BaaS Support", progress: 100 }
];

export const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Fleet Manager, GreenCabs",
    text: "Urja's 3-wheeler batteries have revolutionized our fleet operations. The range and charging speed are unmatched."
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Director, SolarTech Solutions",
    text: "The BESS units we installed for our industrial clients have performed flawlessly. Truly set-and-forget reliability."
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Operations Head, DroneLogistics",
    text: "Switching to Urja's solid-state packs increased our drone flight times by 40%. A game changer for deliveries."
  }
];

export const newsItems = [
  {
    id: 1,
    type: "podcast",
    title: "Why EV Users Avoid Ownership | Battery Leasing, Swapping & India's EV Future",
    source: "The Vision Grid",
    date: "2025-05-28",
    duration: "1:09:08",
    image: "https://img.youtube.com/vi/NXm7ppf8yAA/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/NXm7ppf8yAA",
    description: "Deep dive into battery leasing vs swapping, EV infrastructure challenges, and how Urja's OpEx model wins",
    keyPoints: [
      "Battery = 50% of EV cost",
      "Leasing costs ₹5 paisa/km",
      "No public charging infrastructure needed",
      "Technology agnostic approach"
    ],
    speakers: ["Anagh Ojha", "Pankaj Chopra", "Sachin Agarwal"],
    tags: ["Battery Leasing", "EV Infrastructure", "Business Model"],
    featured: true
  },
  {
    id: 2,
    type: "interview",
    title: "Startup Mantra: Startup में कैसे हासिल होगी कामयाबी?",
    source: "ET Now Swadesh",
    date: "2024-10-18",
    duration: "0:12:38",
    image: "https://img.youtube.com/vi/Oclzom8YYks/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/Oclzom8YYks",
    description: "Anagh Ojha discusses ₹100 crore funding, energy storage challenges, and PM Modi's EV vision",
    keyPoints: [
      "₹100 crore pre-sales funding",
      "Battery storage = grid balancing solution",
      "Supply chain dependency on lithium",
      "E-rickshaw segment largest EV market in India"
    ],
    speakers: ["Anagh Ojha", "Krishna Veer Singh"],
    tags: ["Funding", "Energy Storage", "EV Market"],
    featured: false
  },
  {
    id: 3,
    type: "article",
    title: "Anagh Ojha: Engineering a Sustainable Future with Urja Mobility",
    source: "Audience Reports",
    date: "2024-??-??",
    image: import.meta.env.BASE_URL + "assets/urja-article-thumbnail.jpg",
    articleUrl: "https://audiencereports.in/anagh-ojha-engineering-a-sustainable-future-wit/",
    description: "A feature on Urja Mobility’s mission, Battery-as-a-Service model, and Anagh Ojha’s vision to democratize clean mobility in India.",
    keyPoints: [
      "Battery-as-a-Service enables accessible EV adoption",
      "Solving real-world energy and infrastructure challenges",
      "Building ecosystem through policy, partnerships, and education",
      "Long-term vision focused on sustainability and inclusion"
    ],
    tags: ["BaaS", "EV Adoption", "Sustainability", "Clean Mobility"],
    featured: false
  }
];