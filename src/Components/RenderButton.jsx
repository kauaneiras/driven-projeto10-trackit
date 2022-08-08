import { ThreeDots } from 'react-loader-spinner'

export default function RenderButton(props) {
    const { state, text } = props;
    if(state){
        return (<Loading />)
    }
    if(!state){
        return (<p>{text}</p>)
    }
}

function Loading() {
    return (<ThreeDots color="white" height={80}width={80} />)
}