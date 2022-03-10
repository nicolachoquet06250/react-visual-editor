import {Col, Container, Row, DropdownButton, Dropdown, ButtonGroup, Card, Button} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useComponents } from "../../../../../hooks";
import {FaIcon} from "../../../../../enums/icons";
import {useToggle} from "react-use";

export const ComponentList = ({defaultComponent, onSend}) => {
	const {components} = useComponents();
	const [chosenComponent, setChosenComponent] = useState(defaultComponent?.slug ?? '');
	const [chosenComponentData, setChosenComponentData] = useState({
		...(defaultComponent.data ?? {})
	});
	const chosenComponentTitle = components.reduce((r, c) => c.slug === chosenComponent ? c.title : r, 'None');
	const [cardOpened, toggleCardOpened] = useToggle(true);

	const ChosenBuilderComponent = components.reduce((r, c) => c.slug === chosenComponent ? c.builderComponent : r, undefined);

	const sendData = data => {
		onSend({
			data: {
				component: {
					data: {...data}, slug: chosenComponent
				}
			}
		})
	};

	const handleSend = e => {
		setChosenComponentData(e.data);
		sendData(e.data);
	};

	const getNotRecursiveComponent = () => {
		const component = components.reduce((r, c) => !r && !c.recursive ? c : r, null);
		if (!component) {
			throw new Error('Vous devez enregistrer au moins 1 composant non recursif pour utiliser ce composant UI');
		}

		return component;
	};

	useEffect(() => {
		if (
			!defaultComponent ||
			(typeof defaultComponent === 'object' && !!Object.keys(defaultComponent).length) === false ||
			(typeof defaultComponent === 'object' && defaultComponent.slug !== '') === false
		) {
			const component = getNotRecursiveComponent();
			setChosenComponent(component.slug);
		} else {
			setChosenComponent(defaultComponent.slug);
		}
	}, []);

	useEffect(() => {
		if (chosenComponent !== '') {
			const data = components.reduce((r, c) => c.slug === chosenComponent ? c.data : r, {});
			setChosenComponentData(data);
			sendData(data);
		}
	}, [chosenComponent]);

	return (<Card>
		<Card.Header>
			<Container fluid={'sm'} style={{padding: 0}}>
				<Row>
					<Col sm={10}>
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

					{ChosenBuilderComponent && (<Col sm={2} style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
						<Button variant={'outline-dark'}
								onClick={toggleCardOpened}>
							<i className={cardOpened ? FaIcon.ARROW_UP : FaIcon.ARROW_DOWN} />
						</Button>
					</Col>)}
				</Row>
			</Container>
		</Card.Header>

		{ChosenBuilderComponent && (<Card.Body style={{ display: (cardOpened ? 'inherit' : 'none') }}>
			<Container fluid={'sm'}>
				<Row>
					<Col>
						<ChosenBuilderComponent {...chosenComponentData} onSend={handleSend} />
					</Col>
				</Row>
			</Container>
		</Card.Body>)}
	</Card>);
};
