import { Repeater, SimpleBox } from "../../components/utilities/ui/boxes";
import { Col, Container, Row } from "../../components/utilities/grid";
import wording from './wording';
import { Button, Text, useContextDropdown } from "../../components/utilities/ui/forms";
import { useState } from "react";
import { FaIcon } from "../../enums/icons";

export const MyComponent = ({text, select, texts}) => {
	const [_text, setText] = useState(text ?? '');
	const [_select, setSelect] = useState(select ?? 'toto');
	const [_selectLabel, setSelectLabel] = useState(select ?? 'Toto');
	const [_texts, setTexts] = useState(texts ?? []);

	const {Dropdown, Option} = useContextDropdown();

	const deleteText = index => {
		console.log(_texts.reduce((r, c, i) => index === i ? r : [...r, c], []))
		setTexts(_texts.reduce((r, c, i) => index === i ? r : [...r, c], []));
	};

	const sendData = () => {}

	const DeleteButton = ({i, onClick}) => (
		<Button icon={FaIcon.TRASH}
		        circle={true}
		        noBorder={true}
		        activeColor={'red'}
		        onClick={onClick} />
	);

	return (
		<div>
			<SimpleBox p0={true}>
				<Container>
					<Row>
						<Col>
							<h6>{wording.input.title}</h6>
							<Text value={_text}
							      placeholder={wording.input.placeholder}
							      onUpdate={setText} onInput={sendData}/>
						</Col>

						<Col>
							<h6>{wording.test_text.title}</h6>
							<span>{wording.test_text.text}</span>
						</Col>
					</Row>

					<Row>
						<Col>
							<Dropdown value={_select} label={_selectLabel} onChange={({value, label}) => {
								setSelect(value);
								setSelectLabel(label)
								sendData()
							}}>
								<Option target={'toto'}>
									Toto
								</Option>
								<Option target={'tata'}>
									Tata
								</Option>
								<Option target={'titi'}>
									Titi
								</Option>
							</Dropdown>
						</Col>
					</Row>
				</Container>

				<Repeater title={'Repeater component title'} addLabel={'Add text'}
				          value={_texts} voidModel={''}
				          onUpdate={setTexts} onChange={sendData}
						  child={({i, onChange, onDelete}) => (<Row>
							  <Col>
								  <Text value={_texts[i]} placeholder={wording.repeater.input.placeholder} />
							  </Col>

							  <Col>
								  <DeleteButton i={i} onClick={onDelete} />
							  </Col>
						  </Row>)}/>
			</SimpleBox>
		</div>
	);
}
