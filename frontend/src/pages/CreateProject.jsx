import React from 'react';
import { useCreateProject } from '../hooks/apis/mutations/useCreateProject'
import { Button,Layout } from 'antd'
import { useNavigate } from 'react-router-dom';

   const layoutStyle ={
        borderRadius: 8,
        overflow: 'hidden',
        width:'calc(50% - 8px)',
        maxWidth:'calc(50% - 8px)',
    }
    const headerStyle = {
        textAlign: 'center',
        color: '#fff',
        height: 64,
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: '#7dbcea',
    };
    const contentStyle = {
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#108ee9',
    };
    const siderStyle = {
        textAlign: 'center',
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#108ee9',
    };
    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#7dbcea',
    };

export const CreateProject = () => {

    const { Header, Content, Footer } = Layout;

    const navigate = useNavigate();

 

    const { createProjectMutation } = useCreateProject();

    async function handleCreateProject() {
        console.log('Going to trigger api');
        try {
          const response =  await createProjectMutation();

          navigate(`/project/${response.data}`);
           
            console.log("Now we should rediect to the editor");
            
        } catch (error) {
            console.error('Error creating project:', error);
        }
    }

return (
    <Layout style={layoutStyle}>
        <Header style={headerStyle}>Create Project</Header>
        <Content style={contentStyle}>
            <Button type="primary" onClick={handleCreateProject}>
                Create New Project
            </Button>
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
    </Layout>
);

};