function findPostById(caseData, postId) {
  const postsByPlatform = caseData && caseData.posts ? caseData.posts : {};
  const platforms = ["facebook", "instagram", "linkedin", "twitter"];

  for (let i = 0; i < platforms.length; i += 1) {
    const platformPosts = Array.isArray(postsByPlatform[platforms[i]])
      ? postsByPlatform[platforms[i]]
      : [];
    const match = platformPosts.find(function matchPost(post) {
      return post.id === postId;
    });
    if (match) return match;
  }

  return null;
}

function calculateEvidencePoints(pinnedEvidence, caseData) {
  return pinnedEvidence.reduce(function sumPoints(total, evidence) {
    const post = findPostById(caseData, evidence.postId);
    if (!post) return total;

    let points = Number(post.points) || 0;
    const hasCashback = evidence.vouchers && evidence.vouchers.cashback === true;
    if (post.classification === "red-herring" && hasCashback && points < -2) {
      points = -2;
    }

    return total + points;
  }, 0);
}

function calculateClassificationBonus(pinnedEvidence, caseData) {
  return pinnedEvidence.reduce(function sumClassificationBonus(total, evidence) {
    const post = findPostById(caseData, evidence.postId);
    if (!post) return total;
    return total + (evidence.reason === post.correctReason ? 3 : 0);
  }, 0);
}

function calculateFieldBonus(pinnedEvidence, caseData) {
  return pinnedEvidence.reduce(function sumFieldBonus(total, evidence) {
    const post = findPostById(caseData, evidence.postId);
    if (!post) return total;
    return total + (evidence.field === post.correctField ? 5 : 0);
  }, 0);
}

function calculateNoiseRatio(pinnedEvidence, caseData) {
  const total = pinnedEvidence.length;
  if (total === 0) return 0;

  const junkPins = pinnedEvidence.reduce(function countJunk(count, evidence) {
    const post = findPostById(caseData, evidence.postId);
    if (!post) return count;
    return post.classification === "red-herring" || post.classification === "neutral"
      ? count + 1
      : count;
  }, 0);

  return junkPins / total;
}

function getNoiseMultiplier(ratio) {
  if (ratio <= 0.5) return 1.0;
  if (ratio <= 0.7) return 0.75;
  if (ratio <= 0.9) return 0.5;
  return 0.25;
}

function calculateMissedClues(allPostsInCase, pinnedEvidence) {
  const strongPosts = allPostsInCase.filter(function onlyStrong(post) {
    return post.classification === "strong";
  });

  const pinnedPostIds = new Set(
    pinnedEvidence.map(function pickId(evidence) {
      return evidence.postId;
    })
  );

  const missedStrongCount = strongPosts.filter(function notPinned(post) {
    return !pinnedPostIds.has(post.id);
  }).length;

  return missedStrongCount * -5;
}

function getVerdictPoints(playerVerdict, correctVerdict) {
  return playerVerdict === correctVerdict ? 30 : -10;
}

function calculateFinalScore(caseData, pinnedEvidence, playerVerdict) {
  const evidencePoints = calculateEvidencePoints(pinnedEvidence, caseData);
  const classificationBonus = calculateClassificationBonus(pinnedEvidence, caseData);
  const fieldBonus = calculateFieldBonus(pinnedEvidence, caseData);
  const noiseRatio = calculateNoiseRatio(pinnedEvidence, caseData);
  const noiseMultiplier = getNoiseMultiplier(noiseRatio);
  const adjustedEvidence = (evidencePoints + classificationBonus + fieldBonus) * noiseMultiplier;

  const posts = caseData && caseData.posts ? caseData.posts : {};
  const allPostsInCase = []
    .concat(posts.facebook || [])
    .concat(posts.instagram || [])
    .concat(posts.linkedin || [])
    .concat(posts.twitter || []);

  const missedCluesPenalty = calculateMissedClues(allPostsInCase, pinnedEvidence);
  const verdictPoints = getVerdictPoints(playerVerdict, caseData.correctVerdict);
  const total = Math.max(0, adjustedEvidence + missedCluesPenalty + verdictPoints);

  return {
    evidencePoints,
    classificationBonus,
    fieldBonus,
    noiseMultiplier,
    adjustedEvidence,
    missedCluesPenalty,
    verdictPoints,
    total
  };
}

window.findPostById = findPostById;
window.calculateEvidencePoints = calculateEvidencePoints;
window.calculateClassificationBonus = calculateClassificationBonus;
window.calculateFieldBonus = calculateFieldBonus;
window.calculateNoiseRatio = calculateNoiseRatio;
window.getNoiseMultiplier = getNoiseMultiplier;
window.calculateMissedClues = calculateMissedClues;
window.getVerdictPoints = getVerdictPoints;
window.calculateFinalScore = calculateFinalScore;
