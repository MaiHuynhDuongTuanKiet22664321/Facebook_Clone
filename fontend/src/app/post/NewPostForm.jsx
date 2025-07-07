import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const NewPostForm = ({isPostFormOpen,setIsPostFormOpen}) => {
  return (
    <div>
        <Card>
            <CardContent className="p-4">
                <div className='flex space-x-4'>
                    <Avatar>
                        <AvatarImage />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default NewPostForm
