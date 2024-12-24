import { DeleteTwoTone, EditTwoTone } from "@mui/icons-material";
import { Card, 
    Container,
    IconButton,
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Tooltip, 
    Typography
} from "@mui/material"

import { useNavigate } from "react-router";
import { Task } from "src/models/Task";
import { useAuth } from "src/utils/auth";
import { useDate } from "src/utils/formatDate";
import { useRequests } from "src/utils/requests";

type Props = {
    tasksList: Task[];
    refreshList: () => void;
}

export const TasksTable = ({ tasksList, refreshList }: Props) => {
    const { handlePermissionExists } = useAuth();
    const { deleteTask } = useRequests();

    const { formatAPIDate } = useDate();

    const navigate = useNavigate();

    const handleEditTask = (id: number) => {
        navigate(`/tasks/edit/${id}`);
    }

    const handleDeleteTask = async (id: number) => {
        await deleteTask(id);
    
        refreshList();
    }

    return (
        <>
              <Container maxWidth='lg'>
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Título</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Prazo Máximo</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            { tasksList.map((task) => (
                                <TableRow hover key={task.id}>
                                    <TableCell>
                                        <Typography
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            #{task.id}

                                        </Typography>
                                    </TableCell>
                                 
                                    <TableCell>
                                        <Typography
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {task.title}
                                        </Typography>
                                    </TableCell>
                        
                                    <TableCell>
                                        <Typography
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {task.status}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {task.due_date ? formatAPIDate(task.due_date) : 'Sem prazo'}
                                        </Typography>
                                    </TableCell>
                
                                    <TableCell align="right">
                                            {handlePermissionExists('change_task') && 
                                                <Tooltip 
                                                    title="Editar tarefa"
                                                    arrow
                                                >
                                                    <IconButton 
                                                        onClick={() => handleEditTask(task.id) }
                                                        color='primary'
                                                        size='small'
                                                    >
                                                        <EditTwoTone />
                                                    </IconButton>
                                                </Tooltip>
                                            }

                                            {handlePermissionExists('delete_task') && 
                                                <Tooltip 
                                                    title="Excluir tarefa"
                                                    arrow
                                                >
                                                    <IconButton
                                                        onClick={() => handleDeleteTask(task.id) }   
                                                        color='error'
                                                        size='small'
                                                    >
                                                        <DeleteTwoTone />
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                        
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Container>
        </>
    )
}