import React, {FC, useState} from 'react'

type EditableSpanPropsType = {
    taskTitle: string
}

const EditableSpan: FC<EditableSpanPropsType> = ({taskTitle}) => {
   const [editMode, setEditMode] = useState<boolean>(false)
   const onEditMode = () => {
       setEditMode(true)
   }
    return(
        editMode
        ? <input/>
        : <span>{taskTitle}</span>
    )
}

export default EditableSpan