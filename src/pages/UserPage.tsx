import AddUserDataForm from "../components/AddUserDataForm";
import UserInfo from "../components/UserInfo";
import { useUserStore } from "../store/userInfo";

export default function UserPage() {
    const {firstName, secondName, description} = useUserStore(state => state);
    const isUserData = (firstName && secondName && description) ? true : false;

    return (
        <div className={'d-flex flex-column justify-content-center w-75'}>
            {isUserData
                ? <UserInfo firstName={firstName} secondName={secondName} description={description} />
                : <>
                    <h3 className={'text-center'}>
                        Должна быть информация о пользователе
                        <i className="bi bi-emoji-smile mx-1"></i>
                    </h3>
                    <AddUserDataForm />
                  </>}
        </div>
    )
}