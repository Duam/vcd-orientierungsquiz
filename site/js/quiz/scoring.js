export function calculateRoleType(userChoices, questions) {
    console.log(userChoices);

    for (let i = 0; i < userChoices.length; i++) {
        if (userChoices[i] === undefined) {
          userChoices[i] = 0.5;
        }
    }

    const scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
    const midpoint = 0.5, EPS = 1e-6;

    userChoices.forEach((value, index) => {
      const [firstTrait, secondTrait] = questions[index].type.split('/');
      if (value <= midpoint) {
        scores[firstTrait] += (midpoint - value);
      } else {
        scores[secondTrait] += (value - midpoint);
      }
    });

    const V = (scores.E - scores.I) / (scores.E + scores.I + EPS);
    const Z = (scores.N - scores.S) / (scores.N + scores.S + EPS);
    const M = (scores.F - scores.T) / (scores.F + scores.T + EPS);
    const R = (scores.J - scores.P) / (scores.J + scores.P + EPS);

    const raw = {
      "Frontkämpfer:in":  0.5*V + 0.2*R + 0.1*Z + 0.2*(-M),
      "Strateg:in":       0.4*(-Z) + 0.35*(-M) + 0.25*R + 0.0*V,
      "Möglichmacher:in": 0.45*R + 0.2*(-Z) + 0.2*(-M) + 0.15*(-V),
      "Netzwerker:in":    0.45*V + 0.4*M + 0.15*(-R),
      "Visionär:in":      0.55*Z + 0.2*M + 0.15*V + 0.1*(-R),
      "Diplomat:in":      0.5*M + 0.2*(-V) + 0.2*R + 0.1*Z,
      "Macher:in":        0.45*V + 0.35*(-R) + 0.2*(-Z)
    };

    const rawVals = Object.values(raw);
    const minV = Math.min(...rawVals), maxV = Math.max(...rawVals);
    const scaled = {};
    for (const k in raw) {
      scaled[k] = (maxV === minV) ? 50 : Math.round(100 * (raw[k] - minV) / (maxV - minV));
    }

    return scaled;
}


