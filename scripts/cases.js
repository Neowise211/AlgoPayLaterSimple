const CASES = {
  easy: {
    id: "easy",
    difficulty: "Easy",
    applicant: {
      name: "Kevin Dela Cruz",
      age: 21,
      civilStatus: "Single",
      address: "Quezon City",
      employer: "StarBrew Coffee Co.",
      position: "Shift Supervisor",
      tenure: "2 years",
      income: 28000,
      loanAmount: 50000,
      loanPurpose: "Laptop for online study",
      dependents: 0
    },
    correctVerdict: "reject",
    briefingQuote: "Mukhang bata pa ito, pero may trabaho daw. Tingnan mo muna bago mo i-approve ha. — Ate Vivien",
    posts: {
      facebook: [
        {
          id: "fb1",
          platform: "facebook",
          author: "Kevin Dela Cruz",
          handle: "KevinDC",
          meta: "March 2 · 🎂 Birthday",
          content: "Sweet 17 na ko! Thank you sa mga nag-greet!",
          image: "assets/Easy/Facebook/Post 1.png",
          likes: 124,
          comments: 38,
          classification: "strong",
          correctField: "age",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "fb2",
          platform: "facebook",
          author: "Kevin Dela Cruz",
          handle: "KevinDC",
          meta: "February 15 · Prom Night",
          content: "Prom night with the squad! Grade 11 forever 💙",
          image: "assets/Easy/Facebook/Post 2.png",
          likes: 89,
          comments: 15,
          classification: "strong",
          correctField: "age",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "fb3",
          platform: "facebook",
          author: "Kevin Dela Cruz",
          handle: "KevinDC",
          meta: "January 8",
          content: "New year resolution: mag-ipon para sa laptop.",
          image: "assets/Easy/Facebook/Post 3.png",
          likes: 22,
          comments: 4,
          classification: "neutral",
          correctField: null,
          correctReason: null,
          points: 0
        }
      ],
      instagram: [
        {
          id: "ig1",
          platform: "instagram",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "February 20",
          content: "First shift at StarBrew! Wish me luck ☕",
          image: "assets/Easy/Instagram/Post 1.jpg",
          likes: 56,
          comments: 8,
          classification: "strong",
          correctField: "tenure",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "ig2",
          platform: "instagram",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "January 30 · Throwback",
          content: "Grade 10 graduation throwback 🎓",
          image: "assets/Easy/Instagram/Post 2.jpg",
          likes: 102,
          comments: 22,
          classification: "moderate",
          correctField: "age",
          correctReason: "contradiction",
          points: 8
        },
        {
          id: "ig3",
          platform: "instagram",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "December 12",
          content: "First anime figure purchase, pinag-ipunan ko ng 3 months!",
          image: "Anime figure collection",
          likes: 34,
          comments: 6,
          classification: "red-herring",
          correctField: null,
          correctReason: null,
          points: -8
        }
      ],
      linkedin: [
        {
          id: "li1",
          platform: "linkedin",
          author: "Kevin Dela Cruz",
          handle: "Kevin Dela Cruz",
          meta: "Started February 2026",
          content: "Started February 2026, first corporate job.",
          image: null,
          likes: 18,
          comments: 5,
          classification: "strong",
          correctField: "tenure",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "li2",
          platform: "linkedin",
          author: "Kevin Dela Cruz",
          handle: "Kevin Dela Cruz",
          meta: "Education",
          content: "Education listed as ongoing Senior High School.",
          image: null,
          likes: 43,
          comments: 12,
          classification: "strong",
          correctField: "age",
          correctReason: "contradiction",
          points: 15
        }
      ],
      twitter: [
        {
          id: "tw1",
          platform: "twitter",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "March 10",
          content: "Need laptop for online class, pero wala pang extra money.",
          image: "assets/Easy/X/X post Linda.png",
          likes: 12,
          comments: 3,
          classification: "moderate",
          correctField: "purpose",
          correctReason: "other",
          points: 8
        },
        {
          id: "tw2",
          platform: "twitter",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "February 28",
          content: "di pa ako 18 pero nakapag-loan na 😂 joke lang",
          image: "assets/Easy/X/X post Linda 2.png",
          likes: 8,
          comments: 4,
          classification: "red-herring",
          correctField: null,
          correctReason: null,
          points: -8
        }
      ]
    },
    consequences: {
      wrongApprove: {
        subject: "Follow-up: Kevin Dela Cruz defaulted",
        body: "Remember si Kevin? Turns out 17 years old pala, Grade 11 student. Missed his first payment.",
        pullquote: "Yung birthday post niya sa Facebook, naka-display age niya. Mag-check tayo ng age consistency next time. — Ate Vivien",
        impact: { loss: 50000, trust: -5, lesson: "Check age across platforms" }
      },
      wrongReject: {
        subject: "Update: Kevin followed up",
        body: "May discrepancies talaga sa application niya. Rejecting was the right call — okay lang.",
        pullquote: "Mukhang bata talaga siya. — Ate Vivien",
        impact: { loss: 0, trust: 3, lesson: "Good catch" }
      }
    }
  },
  medium: {
    id: "medium",
    difficulty: "Medium",
    applicant: {
      name: "Kevin Dela Cruz",
      age: 21,
      civilStatus: "Single",
      address: "Quezon City",
      employer: "StarBrew Coffee Co.",
      position: "Shift Supervisor",
      tenure: "2 years",
      income: 28000,
      loanAmount: 50000,
      loanPurpose: "Laptop for online study",
      dependents: 0
    },
    correctVerdict: "reject",
    briefingQuote: "Mukhang bata pa ito, pero may trabaho daw. Tingnan mo muna bago mo i-approve ha. — Ate Vivien",
    posts: {
      facebook: [
        {
          id: "med_fb1",
          platform: "facebook",
          author: "Kevin Dela Cruz",
          handle: "KevinDC",
          meta: "March 2 · 🎂 Birthday",
          content: "Sweet 17 na ko! Thank you sa mga nag-greet!",
          image: "assets/Medium/Facebook/Post 1.png",
          likes: 124,
          comments: 38,
          classification: "strong",
          correctField: "age",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "med_fb2",
          platform: "facebook",
          author: "Kevin Dela Cruz",
          handle: "KevinDC",
          meta: "February 15 · Prom Night",
          content: "Prom night with the squad! Grade 11 forever 💙",
          image: "assets/Medium/Facebook/Post 2.png",
          likes: 89,
          comments: 15,
          classification: "strong",
          correctField: "age",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "med_fb3",
          platform: "facebook",
          author: "Kevin Dela Cruz",
          handle: "KevinDC",
          meta: "January 8",
          content: "New year resolution: mag-ipon para sa laptop.",
          image: "assets/Medium/Facebook/Post 3.png",
          likes: 22,
          comments: 4,
          classification: "neutral",
          correctField: null,
          correctReason: null,
          points: 0
        }
      ],
      instagram: [
        {
          id: "med_ig1",
          platform: "instagram",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "February 20",
          content: "First shift at StarBrew! Wish me luck ☕",
          image: "assets/Medium/Instagram/Post 1.jpg",
          likes: 56,
          comments: 8,
          classification: "strong",
          correctField: "tenure",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "med_ig2",
          platform: "instagram",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "January 30 · Throwback",
          content: "Grade 10 graduation throwback 🎓",
          image: "assets/Medium/Instagram/Post 2.jpg",
          likes: 102,
          comments: 22,
          classification: "moderate",
          correctField: "age",
          correctReason: "contradiction",
          points: 8
        },
        {
          id: "med_ig3",
          platform: "instagram",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "December 12",
          content: "First anime figure purchase, pinag-ipunan ko ng 3 months!",
          image: null,
          likes: 34,
          comments: 6,
          classification: "red-herring",
          correctField: null,
          correctReason: null,
          points: -8
        }
      ],
      linkedin: [
        {
          id: "med_li1",
          platform: "linkedin",
          author: "Kevin Dela Cruz",
          handle: "Kevin Dela Cruz",
          meta: "Started February 2026",
          content: "Started February 2026, first corporate job.",
          image: null,
          likes: 18,
          comments: 5,
          classification: "strong",
          correctField: "tenure",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "med_li2",
          platform: "linkedin",
          author: "Kevin Dela Cruz",
          handle: "Kevin Dela Cruz",
          meta: "Education",
          content: "Education listed as ongoing Senior High School.",
          image: null,
          likes: 43,
          comments: 12,
          classification: "strong",
          correctField: "age",
          correctReason: "contradiction",
          points: 15
        }
      ],
      twitter: [
        {
          id: "med_tw1",
          platform: "twitter",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "March 10",
          content: "Need laptop for online class, pero wala pang extra money.",
          image: "assets/Medium/X/X post Pesto.png",
          likes: 12,
          comments: 3,
          classification: "moderate",
          correctField: "purpose",
          correctReason: "other",
          points: 8
        },
        {
          id: "med_tw2",
          platform: "twitter",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "February 28",
          content: "di pa ako 18 pero nakapag-loan na 😂 joke lang",
          image: "assets/Medium/X/X post Pesto 2.png",
          likes: 8,
          comments: 4,
          classification: "red-herring",
          correctField: null,
          correctReason: null,
          points: -8
        }
      ]
    },
    consequences: {
      wrongApprove: {
        subject: "Follow-up: Kevin Dela Cruz defaulted",
        body: "Remember si Kevin? Turns out 17 years old pala, Grade 11 student. Missed his first payment.",
        pullquote: "Yung birthday post niya sa Facebook, naka-display age niya. Mag-check tayo ng age consistency next time. — Ate Vivien",
        impact: { loss: 50000, trust: -5, lesson: "Check age across platforms" }
      },
      wrongReject: {
        subject: "Update: Kevin followed up",
        body: "May discrepancies talaga sa application niya. Rejecting was the right call — okay lang.",
        pullquote: "Mukhang bata talaga siya. — Ate Vivien",
        impact: { loss: 0, trust: 3, lesson: "Good catch" }
      }
    }
  },
  hard: {
    id: "hard",
    difficulty: "Hard",
    applicant: {
      name: "Kevin Dela Cruz",
      age: 21,
      civilStatus: "Single",
      address: "Quezon City",
      employer: "StarBrew Coffee Co.",
      position: "Shift Supervisor",
      tenure: "2 years",
      income: 28000,
      loanAmount: 50000,
      loanPurpose: "Laptop for online study",
      dependents: 0
    },
    correctVerdict: "reject",
    briefingQuote: "Mukhang bata pa ito, pero may trabaho daw. Tingnan mo muna bago mo i-approve ha. — Ate Vivien",
    posts: {
      facebook: [
        {
          id: "hard_fb1",
          platform: "facebook",
          author: "Kevin Dela Cruz",
          handle: "KevinDC",
          meta: "March 2 · 🎂 Birthday",
          content: "Sweet 17 na ko! Thank you sa mga nag-greet!",
          image: "assets/Hard/Facebook/Post 1.png",
          likes: 124,
          comments: 38,
          classification: "strong",
          correctField: "age",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "hard_fb2",
          platform: "facebook",
          author: "Kevin Dela Cruz",
          handle: "KevinDC",
          meta: "February 15 · Prom Night",
          content: "Prom night with the squad! Grade 11 forever 💙",
          image: "assets/Hard/Facebook/Post 2.png",
          likes: 89,
          comments: 15,
          classification: "strong",
          correctField: "age",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "hard_fb3",
          platform: "facebook",
          author: "Kevin Dela Cruz",
          handle: "KevinDC",
          meta: "January 8",
          content: "New year resolution: mag-ipon para sa laptop.",
          image: "assets/Hard/Facebook/Post 3.png",
          likes: 22,
          comments: 4,
          classification: "neutral",
          correctField: null,
          correctReason: null,
          points: 0
        }
      ],
      instagram: [
        {
          id: "hard_ig1",
          platform: "instagram",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "February 20",
          content: "First shift at StarBrew! Wish me luck ☕",
          image: "assets/Hard/Instagram/Post 1.jpg",
          likes: 56,
          comments: 8,
          classification: "strong",
          correctField: "tenure",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "hard_ig2",
          platform: "instagram",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "January 30 · Throwback",
          content: "Grade 10 graduation throwback 🎓",
          image: "assets/Hard/Instagram/Post 2.jpg",
          likes: 102,
          comments: 22,
          classification: "moderate",
          correctField: "age",
          correctReason: "contradiction",
          points: 8
        },
        {
          id: "hard_ig3",
          platform: "instagram",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "December 12",
          content: "First anime figure purchase, pinag-ipunan ko ng 3 months!",
          image: null,
          likes: 34,
          comments: 6,
          classification: "red-herring",
          correctField: null,
          correctReason: null,
          points: -8
        }
      ],
      linkedin: [
        {
          id: "hard_li1",
          platform: "linkedin",
          author: "Kevin Dela Cruz",
          handle: "Kevin Dela Cruz",
          meta: "Started February 2026",
          content: "Started February 2026, first corporate job.",
          image: null,
          likes: 18,
          comments: 5,
          classification: "strong",
          correctField: "tenure",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "hard_li2",
          platform: "linkedin",
          author: "Kevin Dela Cruz",
          handle: "Kevin Dela Cruz",
          meta: "Education",
          content: "Education listed as ongoing Senior High School.",
          image: null,
          likes: 43,
          comments: 12,
          classification: "strong",
          correctField: "age",
          correctReason: "contradiction",
          points: 15
        }
      ],
      twitter: [
        {
          id: "hard_tw1",
          platform: "twitter",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "March 10",
          content: "Need laptop for online class, pero wala pang extra money.",
          image: "assets/Hard/X/X post Wai Fi.png",
          likes: 12,
          comments: 3,
          classification: "moderate",
          correctField: "purpose",
          correctReason: "other",
          points: 8
        },
        {
          id: "hard_tw2",
          platform: "twitter",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "February 28",
          content: "di pa ako 18 pero nakapag-loan na 😂 joke lang",
          image: "assets/Hard/X/X post Wai Fi 2.png",
          likes: 8,
          comments: 4,
          classification: "red-herring",
          correctField: null,
          correctReason: null,
          points: -8
        }
      ]
    },
    consequences: {
      wrongApprove: {
        subject: "Follow-up: Kevin Dela Cruz defaulted",
        body: "Remember si Kevin? Turns out 17 years old pala, Grade 11 student. Missed his first payment.",
        pullquote: "Yung birthday post niya sa Facebook, naka-display age niya. Mag-check tayo ng age consistency next time. — Ate Vivien",
        impact: { loss: 50000, trust: -5, lesson: "Check age across platforms" }
      },
      wrongReject: {
        subject: "Update: Kevin followed up",
        body: "May discrepancies talaga sa application niya. Rejecting was the right call — okay lang.",
        pullquote: "Mukhang bata talaga siya. — Ate Vivien",
        impact: { loss: 0, trust: 3, lesson: "Good catch" }
      }
    }
  },
  extreme: {
    id: "extreme",
    difficulty: "Extreme",
    applicant: {
      name: "Kevin Dela Cruz",
      age: 21,
      civilStatus: "Single",
      address: "Quezon City",
      employer: "StarBrew Coffee Co.",
      position: "Shift Supervisor",
      tenure: "2 years",
      income: 28000,
      loanAmount: 50000,
      loanPurpose: "Laptop for online study",
      dependents: 0
    },
    correctVerdict: "reject",
    briefingQuote: "Mukhang bata pa ito, pero may trabaho daw. Tingnan mo muna bago mo i-approve ha. — Ate Vivien",
    posts: {
      facebook: [
        {
          id: "ext_fb1",
          platform: "facebook",
          author: "Kevin Dela Cruz",
          handle: "KevinDC",
          meta: "March 2 · 🎂 Birthday",
          content: "Sweet 17 na ko! Thank you sa mga nag-greet!",
          image: "assets/Extreme/Facebook/Post 1.png",
          likes: 124,
          comments: 38,
          classification: "strong",
          correctField: "age",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "ext_fb2",
          platform: "facebook",
          author: "Kevin Dela Cruz",
          handle: "KevinDC",
          meta: "February 15 · Prom Night",
          content: "Prom night with the squad! Grade 11 forever 💙",
          image: "assets/Extreme/Facebook/Post 2.png",
          likes: 89,
          comments: 15,
          classification: "strong",
          correctField: "age",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "ext_fb3",
          platform: "facebook",
          author: "Kevin Dela Cruz",
          handle: "KevinDC",
          meta: "January 8",
          content: "New year resolution: mag-ipon para sa laptop.",
          image: "assets/Extreme/Facebook/Post 3.png",
          likes: 22,
          comments: 4,
          classification: "neutral",
          correctField: null,
          correctReason: null,
          points: 0
        }
      ],
      instagram: [
        {
          id: "ext_ig1",
          platform: "instagram",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "February 20",
          content: "First shift at StarBrew! Wish me luck ☕",
          image: "assets/Extreme/Instagram/Post 1.jpg",
          likes: 56,
          comments: 8,
          classification: "strong",
          correctField: "tenure",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "ext_ig2",
          platform: "instagram",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "January 30 · Throwback",
          content: "Grade 10 graduation throwback 🎓",
          image: "assets/Extreme/Instagram/Post 2.jpg",
          likes: 102,
          comments: 22,
          classification: "moderate",
          correctField: "age",
          correctReason: "contradiction",
          points: 8
        },
        {
          id: "ext_ig3",
          platform: "instagram",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "December 12",
          content: "First anime figure purchase, pinag-ipunan ko ng 3 months!",
          image: null,
          likes: 34,
          comments: 6,
          classification: "red-herring",
          correctField: null,
          correctReason: null,
          points: -8
        }
      ],
      linkedin: [
        {
          id: "ext_li1",
          platform: "linkedin",
          author: "Kevin Dela Cruz",
          handle: "Kevin Dela Cruz",
          meta: "Started February 2026",
          content: "Started February 2026, first corporate job.",
          image: null,
          likes: 18,
          comments: 5,
          classification: "strong",
          correctField: "tenure",
          correctReason: "contradiction",
          points: 15
        },
        {
          id: "ext_li2",
          platform: "linkedin",
          author: "Kevin Dela Cruz",
          handle: "Kevin Dela Cruz",
          meta: "Education",
          content: "Education listed as ongoing Senior High School.",
          image: null,
          likes: 43,
          comments: 12,
          classification: "strong",
          correctField: "age",
          correctReason: "contradiction",
          points: 15
        }
      ],
      twitter: [
        {
          id: "ext_tw1",
          platform: "twitter",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "March 10",
          content: "Need laptop for online class, pero wala pang extra money.",
          image: "assets/Extreme/X/X post Ha Uac.png",
          likes: 12,
          comments: 3,
          classification: "moderate",
          correctField: "purpose",
          correctReason: "other",
          points: 8
        },
        {
          id: "ext_tw2",
          platform: "twitter",
          author: "Kevin Dela Cruz",
          handle: "@kevindc_17",
          meta: "February 28",
          content: "di pa ako 18 pero nakapag-loan na 😂 joke lang",
          image: "assets/Extreme/X/X post Ha Uac 2.png",
          likes: 8,
          comments: 4,
          classification: "red-herring",
          correctField: null,
          correctReason: null,
          points: -8
        }
      ]
    },
    consequences: {
      wrongApprove: {
        subject: "Follow-up: Kevin Dela Cruz defaulted",
        body: "Remember si Kevin? Turns out 17 years old pala, Grade 11 student. Missed his first payment.",
        pullquote: "Yung birthday post niya sa Facebook, naka-display age niya. Mag-check tayo ng age consistency next time. — Ate Vivien",
        impact: { loss: 50000, trust: -5, lesson: "Check age across platforms" }
      },
      wrongReject: {
        subject: "Update: Kevin followed up",
        body: "May discrepancies talaga sa application niya. Rejecting was the right call — okay lang.",
        pullquote: "Mukhang bata talega siya. — Ate Vivien",
        impact: { loss: 0, trust: 3, lesson: "Good catch" }
      }
    }
  }
};

window.CASES = CASES;
