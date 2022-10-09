import React from 'react'
import { useQuery } from "react-query";
import { fetchCoursesByChannelId, fetchUserByEmail } from '../API';

type Props = {
    email: string;
}

const DependentQueries: React.FC<Props> = ({ email }) => {

    /** 
     * TODO: Fetch list of courses for user whose email = faris@foothillsolutions.com  
     *  1. Fetch user's channelId by their email
     *  2. Fetch courses by user's channelId
     */

    // Step 1: Fetch user's channelId by their email
    const { data: user, isLoading: isLoadingUser } = useQuery(
        ['user', email],
        () => fetchUserByEmail(email),
    );

    const channelId = user?.data.channelId;

    // Step 2: Fetch courses by user's channelId
    /**
     * The below 👇 dependent query should be fired only after the user query is completed, so that the channelId is available (not undefined). So, use the `enabled` option to control when the query is fired:
     */
    const { data: channel, isLoading: isLoadingCourses } = useQuery(
        ['channel', channelId],
        () => fetchCoursesByChannelId(channelId),
        {
            enabled: !!channelId,  // double negation to convert channelId to boolean
        }
    );

    if (isLoadingUser)
        return <div>Loading User...</div>

    if (isLoadingCourses)
        return <div>Loading Courses...</div>


    return (
        <div>{
            channel?.data.courses.map((course: any) => (
                <ul>
                    <li key={course}>{course}</li>
                </ul>
            ))
        }</div>
    )
}

export default DependentQueries