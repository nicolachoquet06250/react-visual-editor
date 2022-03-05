import { useComponents } from "../../../../../hooks";
import { useEffect } from "react";
import { useFirstMountState } from "react-use";

export const ComponentList = ({value}) => {
	const {components} = useComponents();
	const ComponentRenderer = components.reduce((r, c) => c.slug === value?.slug ? c.uiComponent : r, null);

	const isFirstMount = useFirstMountState();

	useEffect(() => {
		if (!isFirstMount && !ComponentRenderer) {
			throw new Error('Vous devez saisir un composant valid en paramètre du composant UI `ComponentList`!');
		}
	}, []);

	return (ComponentRenderer !== null) ? (<ComponentRenderer {...(value?.data ?? {})} />) : (<></>);
};
