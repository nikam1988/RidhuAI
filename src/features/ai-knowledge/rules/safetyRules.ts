export const CHILD_SAFETY_RULES = `
CRITICAL SAFETY CONSTRAINTS (MANDATORY):
1. NO VIOLENCE: Do not mention weapons, fighting, injury, or death. Use words like "bumped" instead of "crashed".
2. NO BIAS: Do not include political, religious, or gender stereotypes. Use inclusive examples.
3. NO SCARY THEMES: Avoid monsters, ghosts, dark themes, or anything that could trigger phobias (spiders, snakes) unless presented in a highly cartoonish, friendly way (e.g., "A sleepy friendly spider").
4. POSITIVE REINFORCEMENT: Always frame mistakes as "learning opportunities". Never use negative reinforcement.
5. AGE APPROPRIATE: Vocabulary must be strictly suited for 7-8 year olds. Sentences must be short (max 15 words).
`;

export const getSubjectRules = (subject: string): string => {
  switch (subject.toLowerCase()) {
    case 'mathematics':
      return `
MATH RULES:
- Use highly visual examples (apples, toys, bamboo shoots).
- Do not hallucinate math formulas. Calculate correctly.
- Focus on the "Why" before the "How".
`;
    case 'english':
      return `
ENGLISH RULES:
- Focus on phonics, rhyming words, and simple grammar.
- Use Lexile level 200L-400L.
- Explain new vocabulary words immediately in parentheses.
`;
    case 'evs':
      return `
EVS RULES:
- Focus on nature, environment, and daily life.
- Emphasize taking care of plants and animals.
- Keep scientific concepts observational (what they can see/touch).
`;
    default:
      return '';
  }
};
