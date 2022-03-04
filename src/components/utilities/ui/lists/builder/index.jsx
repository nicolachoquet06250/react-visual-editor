import { SimpleBox } from "../../boxes";
import { Col, Container, Row, DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useComponents } from "../../../../../hooks";

export const ComponentList = ({defaultComponent, onSend}) => {
	const {components} = useComponents();

	const [chosenComponent, setChosenComponent] = useState('');
	const [chosenComponentData, setChosenComponentData] = useState();

	const chosenComponentTitle = components.reduce((r, c) => c.slug === chosenComponent ? c.title : r, 'None');
	const ChosenBuilderComponent = components.reduce((r, c) => c.slug === chosenComponent ? c.builderComponent : r, null);

	useEffect(() => {
		setChosenComponent(defaultComponent?.slug ?? components.reduce((r, c) => !r && !c.recursive ? c.slug : r, ''));
		console.log(chosenComponent, chosenComponentTitle, defaultComponent?.slug, components.reduce((r, c) => !r && !c.recursive ? c.slug : r, ''), (defaultComponent?.slug ?? components.reduce((r, c) => !r && !c.recursive ? c.slug : r, '')));
	}, []);

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

	sendData();

	const handleSend = e => {
		setChosenComponentData(e.data);
		sendData();
	};

	useEffect(() => {
		setChosenComponentData(components.reduce((r, c) => c.slug === chosenComponent ? c.data : r, {}));
		sendData();
	}, [chosenComponent]);

	return (<div>
		<SimpleBox px={5} py={5}>
			<Container>
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
						{ChosenBuilderComponent && (<ChosenBuilderComponent data={chosenComponentData} onSend={handleSend} />)}
					</Col>
				</Row>
			</Container>
		</SimpleBox>
	</div>);
};
