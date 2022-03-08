import { SimpleBox } from "../../boxes";
import { Col, Container, Row, DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useComponents } from "../../../../../hooks";
import { useFirstMountState } from "react-use";

export const ComponentList = ({defaultComponent, onSend}) => {
	const {components} = useComponents();
	const isFirstMount = useFirstMountState();
	const [chosenComponent, setChosenComponent] = useState('');
	const [chosenComponentData, setChosenComponentData] = useState();
	const chosenComponentTitle = components.reduce((r, c) => c.slug === chosenComponent ? c.title : r, 'None');

	const ChosenBuilderComponent = components.reduce((r, c) => c.slug === chosenComponent ? c.builderComponent : r, undefined);

	const sendData = () => {
		onSend({
			data: {
				component: {
					slug: chosenComponent,
					data: chosenComponentData
				}
			}
		})
	};

	const handleSend = e => {
		setChosenComponentData(e.data);
		sendData();
	};

	useEffect(() => {
		if (isFirstMount) {
			if (
				!defaultComponent ||
				(typeof defaultComponent === 'object'
					&& !!Object.keys(defaultComponent).length) === false
			) {
				const component = components.reduce((r, c) => !r && !c.recursive ? c : r, null);
				if (!component) {
					throw new Error('Vous devez enregistrer au moins 1 composant non recursif pour utiliser ce composant UI');
				}

				setChosenComponent(component.slug);
			}
		}
	}, []);

	useEffect(() => {
		setChosenComponentData(components.reduce((r, c) => c.slug === chosenComponent ? c.data : r, {}));
		sendData();
	}, [chosenComponent]);

	return (<Container fluid={'sm'}>
		<Row>
			<Col>
				<DropdownButton as={ButtonGroup}
				                id={`dropdown-secondary`}
				                variant={'outline-secondary'}
				                title={chosenComponentTitle}>
					{components.map((component, i) => (
						<Dropdown.Item eventKey={component.slug}
						               onClick={() => setChosenComponent(component.slug)}
						               key={'dropdown-item-' + i}>
							{component.title}
						</Dropdown.Item>
					))}
				</DropdownButton>
			</Col>
		</Row>

		<Row>
			<Col>
				{ChosenBuilderComponent && (
					<ChosenBuilderComponent data={chosenComponentData}
					                        onSend={handleSend} />
				)}
			</Col>
		</Row>
	</Container>);
};
