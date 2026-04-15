const CASES = {
  easy: {
    id: "easy",
    difficulty: "Easy",
    difficultyBlurb:
      "Standard personal loan packet. Corroborate declarations against supporting records as filed.",
    applicant: {
      name: "Linda Walker",
      age: 21,
      civilStatus: "Single",
      location: "Quezon City",
      address: "Batasan Hills, Quezon City",
      employer: "StarBrew Coffee Co.",
      position: "Shift Supervisor",
      tenure: "2 years",
      income: 28000,
      loanAmount: 50000,
      loanPurpose: "Laptop for online study",
      dependents: 0
    },
    correctVerdict: "reject",
    briefingQuote:
      "Her file looks tidy, but the age trail matters here. Check whether the public record matches the application before you release anything. - Ate Vivien",
    posts: {
      facebook: [
        {
          id: "fb1",
          platform: "facebook",
          author: "Linda Walker",
          handle: "lindawalker.official",
          meta: "March 2 · Birthday",
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
          handle: "lindawalker.official",
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
          handle: "lindawalker.official",
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
          handle: "@linds.walker",
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
          handle: "@linds.walker",
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
          handle: "@linds.walker",
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
          handle: "Shift Supervisor at StarBrew Coffee Co.",
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
          handle: "Senior High School Student",
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
          handle: "@linda_walks",
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
          handle: "@linda_walks",
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
    followUp: {
      correct: {
        subjectLine: "Case closed: Linda Walker was stopped before release",
        body:
          "You rejected Linda Walker before funds left the wallet. The declared age and work history did not survive even a basic cross-check against her public student trail.",
        lesson:
          "When age, education, and employment timeline disagree, treat the contradiction as the main clue.",
        advisorQuote:
          "Good catch. Once the birthday trail and school references lined up, approval was off the table. - Ate Vivien",
        impactReport: {
          defaultLoss: 0,
          trustPoints: 5,
          lessonShort: "Cross-check age with school history"
        },
        primaryCluePostId: "li2"
      },
      wrong: {
        subjectLine: "Follow-up: Linda Walker defaulted",
        body:
          "We approved Linda Walker even though her public trail still read like a student profile. The age, school, and early work-history clues should have stopped the file before disbursement.",
        lesson:
          "Check age and school signals across multiple platforms before trusting declared employment history.",
        advisorQuote:
          "Facebook and LinkedIn were already telling the same story: this applicant was not who the file claimed she was. Catch the identity mismatch before the money leaves. - Ate Vivien",
        impactReport: {
          defaultLoss: 50000,
          trustPoints: -5,
          lessonShort: "Check age across platforms"
        },
        primaryCluePostId: "fb1"
      }
    }
  },
  medium: {
    id: "medium",
    difficulty: "Medium",
    difficultyBlurb:
      "Business facility request. Verify income, collateral, and operational consistency across uploads.",
    applicant: {
      name: "Pesto An O. Tara",
      age: 24,
      civilStatus: "Married",
      location: "Marikina City",
      address: "Concepcion Uno, Marikina City",
      employer: "TeleServe Contact Center",
      position: "Customer Support Associate",
      tenure: "1 year 4 months",
      income: 36000,
      loanAmount: 120000,
      loanPurpose: "Motorcycle for delivery side hustle",
      dependents: 1
    },
    correctVerdict: "reject",
    briefingQuote:
      "This file sounds more mature than the easy case, but do not let the hustle story rush you. Age and work-history clues still have to line up cleanly. - Ate Vivien",
    posts: {
      facebook: [
        {
          id: "med_fb1",
          platform: "facebook",
          author: "Pesto An O. Tara",
          handle: "pesto.tara",
          meta: "March 2 · Birthday",
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
          handle: "pesto.tara",
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
          handle: "pesto.tara",
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
          handle: "@pestoann.t",
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
          handle: "@pestoann.t",
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
          handle: "@pestoann.t",
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
          handle: "Customer Support Associate at TeleServe Contact Center",
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
          handle: "Senior High School Student",
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
          handle: "@pestoann_t",
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
          handle: "@pestoann_t",
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
    followUp: {
      correct: {
        subjectLine: "Case closed: Pesto An O. Tara was blocked before release",
        body:
          "You rejected Pesto An O. Tara before funds were released. The declared call-center profile did not match the older age markers and longer work history surfacing across the public record.",
        lesson:
          "A polished hustle narrative is not enough when the timeline behind it keeps changing.",
        advisorQuote:
          "Nice stop. This file wanted you to focus on the business vibe, but the identity timeline was the real clue. - Ate Vivien",
        impactReport: {
          defaultLoss: 0,
          trustPoints: 5,
          lessonShort: "Verify age and work history together"
        },
        primaryCluePostId: "med_fb1"
      },
      wrong: {
        subjectLine: "Follow-up: Pesto An O. Tara went delinquent",
        body:
          "We approved a file whose online footprint already conflicted with the declared age and work history. The business story felt active, but the identity timeline did not hold up.",
        lesson:
          "Cross-check age and work history together, not just the applicant's lifestyle story.",
        advisorQuote:
          "The file looked busy, but the timeline was doing the talking. When the age and employment story drift apart, slow the approval down. - Ate Vivien",
        impactReport: {
          defaultLoss: 120000,
          trustPoints: -5,
          lessonShort: "Cross-check age and work history"
        },
        primaryCluePostId: "med_tw1"
      }
    }
  },
  hard: {
    id: "hard",
    difficulty: "Hard",
    difficultyBlurb:
      "Unsecured loan with a busy file. Cross-check timeline, employment, and public footprint for alignment.",
    applicant: {
      name: "Wai Fai Ni Piter",
      age: 22,
      civilStatus: "Single",
      location: "Tarlac City",
      address: "San Rafael, Tarlac City",
      employer: "Nimbus Digital Services",
      position: "Content Moderator",
      tenure: "2 years 6 months",
      income: 47000,
      loanAmount: 180000,
      loanPurpose: "Home office computer upgrade",
      dependents: 2
    },
    correctVerdict: "reject",
    briefingQuote:
      "Hard cases hide the real issue inside a noisy feed. Stay patient and pin only the contradictions that actually break the declared story. - Ate Vivien",
    posts: {
      facebook: [
        {
          id: "hard_fb1",
          platform: "facebook",
          author: "Wai Fai Ni Piter",
          handle: "waifainipiter",
          meta: "March 2 · Birthday",
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
          handle: "waifainipiter",
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
          handle: "waifainipiter",
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
          handle: "@waifai.piter",
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
          handle: "@waifai.piter",
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
          handle: "@waifai.piter",
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
          handle: "Content Moderator at Nimbus Digital Services",
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
          handle: "Senior High School Student",
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
          handle: "@wai_fai_p",
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
          handle: "@wai_fai_p",
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
    followUp: {
      correct: {
        subjectLine: "Case closed: Wai Fai Ni Piter was blocked before release",
        body:
          "You rejected Wai Fai Ni Piter before the unsecured loan was released. The declared profile looked polished, but the identity and education trail never aligned with the application.",
        lesson:
          "Busy feeds can distract you, so anchor the verdict on the contradiction that breaks the file.",
        advisorQuote:
          "That was the right call. Once the profile and education record stopped agreeing, the rest of the noise did not matter. - Ate Vivien",
        impactReport: {
          defaultLoss: 0,
          trustPoints: 5,
          lessonShort: "Anchor the verdict on the file mismatch"
        },
        primaryCluePostId: "hard_li2"
      },
      wrong: {
        subjectLine: "Follow-up: Wai Fai Ni Piter defaulted",
        body:
          "We approved Wai Fai Ni Piter even though the profile carried identity and education inconsistencies. The public trail looked polished, but the declared background still failed basic verification.",
        lesson:
          "Verify identity details underneath polished social presence before trusting the file.",
        advisorQuote:
          "A polished feed is not a clean file. The contradiction was there; we just needed to stay focused on it. - Ate Vivien",
        impactReport: {
          defaultLoss: 180000,
          trustPoints: -5,
          lessonShort: "Verify identity beneath the polish"
        },
        primaryCluePostId: "hard_fb1"
      }
    }
  },
  extreme: {
    id: "extreme",
    difficulty: "Extreme",
    difficultyBlurb:
      "High-volume dossier with extensive attachments. Review methodically before stamping a verdict.",
    applicant: {
      name: "Ha Uac M. Angbit",
      age: 29,
      civilStatus: "Married",
      location: "Pasig City",
      address: "Rosario, Pasig City",
      employer: "Northgate Engineering Services",
      position: "Project Coordinator",
      tenure: "4 years",
      income: 68000,
      loanAmount: 250000,
      loanPurpose: "Tuition buffer and family expenses",
      dependents: 3
    },
    correctVerdict: "reject",
    briefingQuote:
      "Extreme files try to overwhelm you with volume. Slow the case down and verify the core identity before anything else. - Ate Vivien",
    posts: {
      facebook: [
        {
          id: "ext_fb1",
          platform: "facebook",
          author: "Ha Uac M. Angbit",
          handle: "huac.angbit",
          meta: "March 2 · Birthday",
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
          handle: "huac.angbit",
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
          handle: "huac.angbit",
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
          handle: "@huac.angbit",
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
          handle: "@huac.angbit",
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
          handle: "@huac.angbit",
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
          handle: "Project Coordinator at Northgate Engineering Services",
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
          handle: "Senior High School Student",
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
          handle: "@huac_angbit",
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
          handle: "@huac_angbit",
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
    followUp: {
      correct: {
        subjectLine: "Case closed: Ha Uac M. Angbit was blocked before release",
        body:
          "You rejected Ha Uac M. Angbit before a large disbursement was released. The dense file tried to bury the issue, but the core identity trail still collapsed under review.",
        lesson:
          "When a file is dense, slow down and verify the identity spine before you chase secondary signals.",
        advisorQuote:
          "That is how you handle an extreme file: find the core contradiction, then ignore the clutter around it. - Ate Vivien",
        impactReport: {
          defaultLoss: 0,
          trustPoints: 5,
          lessonShort: "Validate identity before volume overwhelms you"
        },
        primaryCluePostId: "ext_fb1"
      },
      wrong: {
        subjectLine: "Follow-up: Ha Uac M. Angbit defaulted",
        body:
          "We approved a high-volume file even though the identity trail was inconsistent from the start. Extreme cases need slower verification, especially when age and lifestyle signals pull in different directions.",
        lesson:
          "Slow down on dense files and validate the core identity before trusting the rest of the dossier.",
        advisorQuote:
          "Volume is not evidence. The file threw a lot at us, but the identity mismatch was still the deciding clue. - Ate Vivien",
        impactReport: {
          defaultLoss: 250000,
          trustPoints: -5,
          lessonShort: "Slow down and verify the identity core"
        },
        primaryCluePostId: "ext_fb1"
      }
    }
  }
};

window.CASES = CASES;
