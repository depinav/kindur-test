const _ = require('lodash');

(function() {
  const sample = _.last(process.argv);
  const results = replaceAllXsWithZeroAndOne(sample);
  process.stdout.write(results.toString());
})();

function replaceAllXsWithZeroAndOne(sample) {
  const induces = [];
  // get induces of str that are 'X'
  for(let i = 0, len = sample.length; i < len; i++) {
    if(_.toLower(sample[i]) === 'x') induces.push(i);
  }

  // induces.length === number of x's
  // number of permutations === numOfXs *2
  const numOfXs = induces.length;
  const totalPermutations = new Array(numOfXs *2);
  let prevSampleForMap = '';


  return results = _.map(totalPermutations, (perm, i) => {
    if(i === 0) {
      prevSampleFromMap = sample.replace(/\X|x/g, '0');
      return prevSampleFromMap;
    }
    
    const index = induces[i %numOfXs];
    const replacement = prevSampleFromMap.charAt(index) === '0' ? '1' : '0';
    const newSample = replaceAt(prevSampleFromMap, index, replacement);
    prevSampleFromMap = newSample;
    
    return newSample;
  })
}

function replaceAt(original, index, replacement) {
  return original.substr(0, index) + replacement+ original.substr(index + replacement.length);
}