import React from "react";

export const JsonDebugger = ({json}) => {
	return (
		<pre>{JSON.stringify(json, undefined, '  ')}</pre>
	);
};
