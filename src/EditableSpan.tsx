import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react'
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    someTitle: string
    changeTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = ({someTitle, changeTitle}) => {

   const [editMode, setEditMode] = useState<boolean>(false)
   const [title, setTitle] = useState<string>(someTitle)
   const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
   const onEditMode = () => setEditMode(true)
   const offEditMode = () => {
       changeTitle(title)
       setEditMode(false)
   }
   const onKeyPressEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
       if(e.key === 'Enter' ){
           offEditMode()
       }
   }

    return(
        editMode
        ? <TextField
                onKeyPress={onKeyPressEditMode}
                value={title}
                onChange={onChangeTitle}
                onBlur={offEditMode}
                autoFocus={true}
            />
        : <span onDoubleClick={onEditMode}>{someTitle}</span>
    )
}

export default EditableSpan