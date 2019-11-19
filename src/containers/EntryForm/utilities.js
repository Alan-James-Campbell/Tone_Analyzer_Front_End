import _                                          from 'lodash'

export const organizeAnalysis = results => {
	const sentencesToneObjectArray = _.get(results, 'result.sentences_tone', [])
	const documentTones = _.get(results, 'result.document_tone.tones', [])
	return {
	  documentTones,
	  sentencesToneObjectArray
	}
}