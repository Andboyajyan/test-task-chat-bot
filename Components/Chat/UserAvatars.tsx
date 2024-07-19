import Image from 'next/image';
import avatar1 from '/public/images/avatar1.svg';
import avatar2 from '/public/images/avatar2.svg';
import avatar3 from '/public/images/avatar3.svg';
import avatar4 from '/public/images/avatar4.svg';

const users = [avatar1, avatar2, avatar3, avatar4];

export const UserAvatars = () => {
    return (
        <>
            {users.map((user, i) => (
                <Image key={i} src={user} width={24} height={24} alt='user' style={{ transform: `translateX(${i * -5}px)` }} />
            ))}
        </>
    )
}