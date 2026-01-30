export const MOCK_RESPONSE =
  'This text is  **bold** and this is **VERY BOLD**.\
\nFunction example:\n\
\n```\nconst sum = (a, b) => a + b\n```\n\
\nThis is not code\
';

export const MOCK_RESPONSE_NOT_MD = `Here is a long response to test your streaming logic.
React Native architecture typically consists of three threads: 
1. The Main Thread (UI) 
2. The JavaScript Thread (Logic) 
3. The Shadow Thread (Layout). n
When streaming data, it's crucial not to block the JS thread with heavy computations!
`;

export const POSSIBLE_RESPONSES = [MOCK_RESPONSE, MOCK_RESPONSE_NOT_MD];
