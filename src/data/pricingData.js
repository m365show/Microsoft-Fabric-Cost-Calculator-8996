export const fabricPricing = {
  capacity: {
    F2: 263,
    F4: 526,
    F8: 1052,
    F16: 2104,
    F32: 4208,
    F64: 8416,
    F128: 16832,
    F256: 33664,
    F512: 67328
  },
  
  capacityFeatures: {
    F2: [
      '2 Capacity Units',
      'Basic workloads',
      'Standard support',
      'Regional availability'
    ],
    F4: [
      '4 Capacity Units',
      'Enhanced performance',
      'Advanced analytics',
      'Multi-region support'
    ],
    F8: [
      '8 Capacity Units',
      'High-performance computing',
      'Real-time analytics',
      'Premium support'
    ],
    F16: [
      '16 Capacity Units',
      'Enterprise-grade performance',
      'Advanced security features',
      'Dedicated support'
    ],
    F32: [
      '32 Capacity Units',
      'Maximum performance',
      'Custom configurations',
      '24/7 premium support'
    ],
    F64: [
      '64 Capacity Units',
      'Ultra-high performance',
      'Enterprise features',
      'Dedicated account manager'
    ]
  },

  workloads: {
    dataFactory: {
      name: 'Data Factory',
      baseRate: 0.50,
      unit: 'per pipeline run',
      description: 'ETL/ELT data integration and transformation pipelines',
      tiers: [
        { range: '0-1,000 runs', rate: 0.50 },
        { range: '1,001-10,000 runs', rate: 0.45 },
        { range: '10,001+ runs', rate: 0.40 }
      ]
    },
    synapse: {
      name: 'Synapse Analytics',
      baseRate: 2.00,
      unit: 'per compute hour',
      description: 'Data warehousing and big data analytics platform',
      tiers: [
        { range: '0-100 hours', rate: 2.00 },
        { range: '101-500 hours', rate: 1.80 },
        { range: '501+ hours', rate: 1.60 }
      ]
    },
    powerBI: {
      name: 'Power BI Premium',
      baseRate: 10.00,
      unit: 'per user per month',
      description: 'Advanced business intelligence and reporting capabilities',
      tiers: [
        { range: '1-100 users', rate: 10.00 },
        { range: '101-500 users', rate: 9.00 },
        { range: '501+ users', rate: 8.00 }
      ]
    },
    dataActivator: {
      name: 'Data Activator',
      baseRate: 0.10,
      unit: 'per 1,000 events',
      description: 'Real-time data monitoring and automated alerting',
      tiers: [
        { range: '0-1M events', rate: 0.10 },
        { range: '1M-10M events', rate: 0.08 },
        { range: '10M+ events', rate: 0.06 }
      ]
    },
    realTimeAnalytics: {
      name: 'Real-Time Analytics',
      baseRate: 1.50,
      unit: 'per processing hour',
      description: 'Stream processing and real-time data analytics',
      tiers: [
        { range: '0-100 hours', rate: 1.50 },
        { range: '101-500 hours', rate: 1.35 },
        { range: '501+ hours', rate: 1.20 }
      ]
    }
  }
};