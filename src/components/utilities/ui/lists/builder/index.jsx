import { SimpleBox } from "../../boxes";
import { Col, Container, Row } from "../../../grid";
import { useContextDropdown } from "../../forms";
import { useEffect, useState } from "react";
import { useComponents } from "../../../../../hooks";

export const ComponentList = ({defaultComponent, onSend}) => {
	const {Dropdown, Option} = useContextDropdown();
	const {components} = useComponents();

	const [chosenComponent, setChosenComponent] = useState(defaultComponent?.slug ?? components.reduce((r, c) => !r && !c.recursive ? c.slug : r, ''));
	const [chosenComponentData, setChosenComponentData] = useState();

	const chosenComponentTitle = components.reduce((r, c) => c.slug === chosenComponent ? c.title : r, 'None');
	const ChosenBuilderComponent = components.reduce((r, c) => c.slug === chosenComponent ? c.builderComponent : r, null);

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
						<Dropdown value={chosenComponent}
						          label={chosenComponentTitle}
						          onChange={({value}) => {
									  setChosenComponent(value);
							          sendData();
						          }}>
							{components.map((component, i) => (
								<Option target={component.slug}>
									{component.title}
								</Option>
							))}
						</Dropdown>
					</Col>
				</Row>

				<Row>
					<Col>
						<ChosenBuilderComponent data={chosenComponentData} onSend={handleSend} />
					</Col>
				</Row>
			</Container>
		</SimpleBox>
	</div>);
};
