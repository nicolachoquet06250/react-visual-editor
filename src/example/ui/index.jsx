import { ComponentList } from "../../components/utilities/ui/lists/ui";

export const MyComponent = ({
    text, select, selected,
    texts = [], component = {}
}) => (
	<>
		<div>
			text: {text}
		</div>
		<div>
			select: {select}
		</div>
		<div>
			<ul>
				{texts.map((t, i) => (<li key={'text-list-' + i}>
					{t}
				</li>))}
			</ul>
		</div>
		<div>
			selected: {selected ? '😁' : '😥'}
		</div>
		<div> <hr /> </div>
		<div>
			<ComponentList value={component?.data?.component ?? {}} />
		</div>
	</>
);

export const MySecondComponent = () => {
	return (
		<span>
			Coucou à toi Jeune Padawan 😆
		</span>
	);
};
