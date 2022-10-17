import React, {FC} from 'react'

type EditableSpanPropsType = {
    taskTitle: string
}

const EditableSpan: FC<EditableSpanPropsType> = (props) => {

    return(
        <div>
            <span>{props.taskTitle}</span>
        </div>
    )
}

export default EditableSpan