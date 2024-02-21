import { Button, Card } from 'react-bootstrap';
import { UserDataType } from '../helpers/types';
import { useUserStore } from '../store/userInfo';

export default function UserInfo(props: UserDataType) {
    const deleteUserData = useUserStore(state => state.deleteUserData);

    return (
        <Card>
            <Card.Header>{props.firstName} {props.secondName}</Card.Header>
            <Card.Body>{props.description}</Card.Body>
            <Card.Body>
                <Button variant={'danger'} onClick={deleteUserData} title={'Удалить информацию'}>
                    Удалить информацию
                </Button>
            </Card.Body>
        </Card>
    )
}