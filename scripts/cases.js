const CASES = {
  easy: {
    id: "easy",
    difficulty: "Easy",
    applicant: {
      name: "Linda Walker",
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
          author: "Linda Walker",
          handle: "KevinDC",
          meta: "March 2 · 🎂 Birthday",
          content: "",
          image: "assets/Easy/Facebook/Post 1.png",
          previewDescription:
            "Facebook birthday event showing 'Born on June 10, 2007'",
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
          author: "Linda Walker",
          handle: "KevinDC",
          meta: "February 15 · Prom Night",
          content: "",
          image: "assets/Easy/Facebook/Post 2.png",
          previewDescription:
            "Shared a quote post: 'keep on LEARNING until the L is silent' from Tula ni Choy",
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
          author: "Linda Walker",
          handle: "KevinDC",
          meta: "January 8",
          content: "",
          image: "assets/Easy/Facebook/Post 3.png",
          previewDescription:
            "Shared a UMG Philippines post about Justin Bieber at Coachella, wanting to buy a ticket",
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
          author: "Linda Walker",
          handle: "@kevindc_17",
          meta: "February 20",
          content: "",
          image: "assets/Easy/Instagram/Post 1.jpg",
          previewDescription:
            "Instagram photo of a quiz bee medal with caption 'easy quiz bee, better luck next time guys'",
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
          author: "Linda Walker",
          handle: "@kevindc_17",
          meta: "January 30 · Throwback",
          content: "",
          image: "assets/Easy/Instagram/Post 2.jpg",
          previewDescription:
            "Certificate of Achievement awarded to Linda Walker for scoring 719 in a mock exam",
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
          author: "Linda Walker",
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
          id: "li1",
          platform: "linkedin",
          author: "Linda Walker",
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
          author: "Linda Walker",
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
          author: "Linda Walker",
          handle: "@kevindc_17",
          meta: "March 10",
          content: "",
          image: "assets/Easy/X/X post Linda.png",
          previewDescription: "Tweet bragging about how easy the mock exam was",
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
          author: "Linda Walker",
          handle: "@kevindc_17",
          meta: "February 28",
          content: "",
          image: "assets/Easy/X/X post Linda 2.png",
          previewDescription:
            "Tweet saying 'gusto ko na matapos tong sem na to' (wants the semester to end)",
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
      name: "Pesto An O. Tara",
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
          author: "Pesto An O. Tara",
          handle: "KevinDC",
          meta: "March 2 · 🎂 Birthday",
          content: "",
          image: "assets/Medium/Facebook/Post 1.png",
          previewDescription:
            "Facebook birthday event showing 'Born on January 27, 1998'",
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
          author: "Pesto An O. Tara",
          handle: "KevinDC",
          meta: "February 15 · Prom Night",
          content: "",
          image: "assets/Medium/Facebook/Post 2.png",
          previewDescription:
            "Shared a Teleperformance hiring post listing BPO job qualifications and benefits",
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
          author: "Pesto An O. Tara",
          handle: "KevinDC",
          meta: "January 8",
          content: "",
          image: "assets/Medium/Facebook/Post 3.png",
          previewDescription:
            "Shared a PGAG meme about forgetting how to work, captioned 'ako na to next week'",
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
          author: "Pesto An O. Tara",
          handle: "@kevindc_17",
          meta: "February 20",
          content: "",
          image: "assets/Medium/Instagram/Post 1.jpg",
          previewDescription:
            "Cafe date photo at Gachi Cafe with pesto pasta and drinks after a tiring day at work",
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
          author: "Pesto An O. Tara",
          handle: "@kevindc_17",
          meta: "January 30 · Throwback",
          content: "",
          image: "assets/Medium/Instagram/Post 2.jpg",
          previewDescription:
            "Another food date photo at Kape cafe with pasta, toast, and drinks",
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
          author: "Pesto An O. Tara",
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
          author: "Pesto An O. Tara",
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
          author: "Pesto An O. Tara",
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
          author: "Pesto An O. Tara",
          handle: "@kevindc_17",
          meta: "March 10",
          content: "",
          image: "assets/Medium/X/X post Pesto.png",
          previewDescription:
            "Tweet introducing self as 28 years old, working in BPO for 6 years, looking for WFH job",
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
          author: "Pesto An O. Tara",
          handle: "@kevindc_17",
          meta: "February 28",
          content: "",
          image: "assets/Medium/X/X post Pesto 2.png",
          previewDescription: "Tweet complaining about gas prices in the Philippines",
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
      name: "Wai Fai Ni Piter",
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
          author: "Wai Fai Ni Piter",
          handle: "KevinDC",
          meta: "March 2 · 🎂 Birthday",
          content: "",
          image: "assets/Hard/Facebook/Post 1.png",
          previewDescription:
            "Facebook birthday event showing 'Born on December 26, 2000'",
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
          author: "Wai Fai Ni Piter",
          handle: "KevinDC",
          meta: "February 15 · Prom Night",
          content: "",
          image: "assets/Hard/Facebook/Post 2.png",
          previewDescription:
            "Promoting Shopee Affiliates partnership and inviting others to sign up",
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
          author: "Wai Fai Ni Piter",
          handle: "KevinDC",
          meta: "January 8",
          content: "",
          image: "assets/Hard/Facebook/Post 3.png",
          previewDescription:
            "Shared news about 4 Tarlac students involved in animal cruelty, calling for their arrest",
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
          author: "Wai Fai Ni Piter",
          handle: "@kevindc_17",
          meta: "February 20",
          content: "",
          image: "assets/Hard/Instagram/Post 1.jpg",
          previewDescription:
            "Photo of a white cat with heterochromia, caption about the cat distribution system",
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
          author: "Wai Fai Ni Piter",
          handle: "@kevindc_17",
          meta: "January 30 · Throwback",
          content: "",
          image: "assets/Hard/Instagram/Post 2.jpg",
          previewDescription:
            "Meme photo promoting a wifi repeater for free internet with no monthly payments",
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
          author: "Wai Fai Ni Piter",
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
          author: "Wai Fai Ni Piter",
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
          author: "Wai Fai Ni Piter",
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
          author: "Wai Fai Ni Piter",
          handle: "@kevindc_17",
          meta: "March 10",
          content: "",
          image: "assets/Hard/X/X post Wai Fi.png",
          previewDescription: "Tweet condemning teenagers who harmed stray animals",
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
          author: "Wai Fai Ni Piter",
          handle: "@kevindc_17",
          meta: "February 28",
          content: "",
          image: "assets/Hard/X/X post Wai Fi 2.png",
          previewDescription: "Tweet about the extreme heat in the Philippines",
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
      name: "Ha Uac M. Angbit",
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
          author: "Ha Uac M. Angbit",
          handle: "KevinDC",
          meta: "March 2 · 🎂 Birthday",
          content: "",
          image: "assets/Extreme/Facebook/Post 1.png",
          previewDescription:
            "Facebook birthday event showing 'Born on November 05, 1985'",
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
          author: "Ha Uac M. Angbit",
          handle: "KevinDC",
          meta: "February 15 · Prom Night",
          content: "",
          image: "assets/Extreme/Facebook/Post 2.png",
          previewDescription:
            "Shared a Pawssion Project post about fireworks endangering neighborhood pets",
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
          author: "Ha Uac M. Angbit",
          handle: "KevinDC",
          meta: "January 8",
          content: "",
          image: "assets/Extreme/Facebook/Post 3.png",
          previewDescription:
            "Shared PRC Board EELE 2026 exam results, congratulating engineers",
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
          author: "Ha Uac M. Angbit",
          handle: "@kevindc_17",
          meta: "February 20",
          content: "",
          image: "assets/Extreme/Instagram/Post 1.jpg",
          previewDescription:
            "Nostalgic photo of a sleeping puppy named Yuna on a couch",
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
          author: "Ha Uac M. Angbit",
          handle: "@kevindc_17",
          meta: "January 30 · Throwback",
          content: "",
          image: "assets/Extreme/Instagram/Post 2.jpg",
          previewDescription:
            "Photo of La La Land In Concert show in Thailand, describing it as a perfect trip ending",
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
          author: "Ha Uac M. Angbit",
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
          author: "Ha Uac M. Angbit",
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
          author: "Ha Uac M. Angbit",
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
          author: "Ha Uac M. Angbit",
          handle: "@kevindc_17",
          meta: "March 10",
          content: "",
          image: "assets/Extreme/X/X post Ha Uac.png",
          previewDescription:
            "Tweet saying 'sanaol sumasahod kahit laging absent' (envious of getting paid despite absences)",
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
          author: "Ha Uac M. Angbit",
          handle: "@kevindc_17",
          meta: "February 28",
          content: "",
          image: "assets/Extreme/X/X post Ha Uac 2.png",
          previewDescription:
            "Tweet about international school fees going up to 800k per kid, times three",
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
