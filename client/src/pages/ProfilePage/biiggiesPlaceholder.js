import React from "react"
import ContentLoader from "react-content-loader"

const BiiggiePlaceholder = (props) => (
    <ContentLoader 
    speed={2}
    width={1000}
    height={500}
    viewBox="0 0 600 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="6" y="48" rx="0" ry="0" width="7" height="219" /> 
    <rect x="6" y="259" rx="0" ry="0" width="171" height="8" /> 
    <rect x="172" y="48" rx="0" ry="0" width="8" height="218" /> 
    <rect x="8" y="48" rx="0" ry="0" width="171" height="8" /> 
    <rect x="12" y="231" rx="0" ry="0" width="165" height="32" /> 
    <rect x="52" y="197" rx="0" ry="0" width="77" height="10" /> 
    <rect x="39" y="180" rx="0" ry="0" width="103" height="13" /> 
    <rect x="12" y="52" rx="0" ry="0" width="166" height="115" /> 
    <rect x="205" y="48" rx="0" ry="0" width="7" height="219" /> 
    <rect x="205" y="259" rx="0" ry="0" width="171" height="8" /> 
    <rect x="371" y="48" rx="0" ry="0" width="8" height="218" /> 
    <rect x="207" y="48" rx="0" ry="0" width="171" height="8" /> 
    <rect x="211" y="231" rx="0" ry="0" width="165" height="32" /> 
    <rect x="251" y="197" rx="0" ry="0" width="77" height="10" /> 
    <rect x="238" y="180" rx="0" ry="0" width="103" height="13" /> 
    <rect x="211" y="52" rx="0" ry="0" width="166" height="115" /> 
    <rect x="400" y="46" rx="0" ry="0" width="7" height="219" /> 
    <rect x="400" y="257" rx="0" ry="0" width="171" height="8" /> 
    <rect x="566" y="46" rx="0" ry="0" width="8" height="218" /> 
    <rect x="402" y="46" rx="0" ry="0" width="171" height="8" /> 
    <rect x="406" y="229" rx="0" ry="0" width="165" height="32" /> 
    <rect x="446" y="195" rx="0" ry="0" width="77" height="10" /> 
    <rect x="433" y="178" rx="0" ry="0" width="103" height="13" /> 
    <rect x="406" y="50" rx="0" ry="0" width="166" height="115" />
  </ContentLoader>
)

export default BiiggiePlaceholder