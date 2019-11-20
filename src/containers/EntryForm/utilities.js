import _                                          from 'lodash'

export const organizeAnalysis = results => {
  const sentencesToneObjectArray = _.get(results, 'sentences_tone', [])
  const documentTones = _.get(results, 'document_tone.tones', [])
  return {
    documentTones,
	sentencesToneObjectArray
  }
}