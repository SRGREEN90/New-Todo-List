import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react'

type EditableSpanPropsType = {
    taskTitle: string
    changeTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = ({taskTitle, changeTitle}) => {

   const [editMode, setEditMode] = useState<boolean>(false)
   const [title, setTitle] = useState<string>(taskTitle)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


   const onEditMode = () => setEditMode(true)
   const offEditMode = () => {
       changeTitle(title)
       setEditMode(false)
   }
   const onKeyPressEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
       if(e.key === 'Enter' ){
           changeTitle(title)
           setEditMode(false)
       }
   }

    return(
        editMode
        ? <input onKeyPress={onKeyPressEditMode}
                 value={title}
                 onChange={onChangeTitle}
                 onBlur={offEditMode}
                 autoFocus
            />
        : <span onDoubleClick={onEditMode}>{taskTitle}</span>
    )
}

export default EditableSpan