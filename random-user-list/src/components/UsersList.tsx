import{type User} from '../types.d'
interface Props{
    highlightRow:boolean
    users:User[]
}
export function UsersList({highlightRow,users}:Props){
    return(
        <table width='100%'>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>País</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user,index)=>{
                        const styleRowBackgroundColor= index % 2 == 0 ? '#333':'#555'
                        const color =highlightRow?styleRowBackgroundColor:'transparent'
                        return(
                            <tr key={index} style={{backgroundColor:color}}>
                                <td>
                                    <img src={user.picture.thumbnail} alt="" />
                                </td>
                                <td>
                                    {user.name.first}
                                </td>
                                <td>
                                    {user.name.last}
                                </td>
                                <td>
                                    {user.location.country}
                                </td>
                                <td>
                                    <button>Eliminar</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}