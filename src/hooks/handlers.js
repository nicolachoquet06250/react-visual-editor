export const useEventHandler = handler =>
	(...params) =>
			e => handler(e, ...params);

export const useSimpleHandler = handler =>
	(...params) =>
		() => handler(...params)
