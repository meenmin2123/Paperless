import React, { useState } from 'react';
import { Modal, Button, Tabs, Tab, Table, Form } from 'react-bootstrap';
import { useDrag, useDrop } from 'react-dnd';
import styles from '../../styles/layout/ApprovalLine.module.css';
import OrgChart from '../layout/org_chart';

const ITEM_TYPE = 'ITEM';

const DraggableRow = ({ person, index, moveRow, handleRemovePerson, handleSelectChange, rowClass, type }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { data: person, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  // Ref 연결: drag와 drop을 하나의 ref에 연결
  const dragDropRef = React.useRef(null);
  drag(drop(dragDropRef));

  return (
    <tr ref={dragDropRef} className={rowClass} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <td>{index + 1}</td>
      <td>{person.dept_name || person.deptName}</td>
      <td>{person.dept_team_name || person.teamName || "-"}</td>
      <td>{person.posi_name || "-"}</td> 
      <td>{person.emp_name || "-"}</td>
      {type === 'approver' && (
      <td>
        <Form.Select aria-label="Default select example" value={person.approvalType || ''}
          onChange={(e) => handleSelectChange(index, e.target.value)}>
          <option value="">선택</option>
          <option value="전결">전결</option>
          <option value="대결">대결</option>
          <option value="결재">결재</option>
        </Form.Select>
      </td>
      )}
      <td>
        <Button variant="danger" size="sm" onClick={() => handleRemovePerson(index)}>
          삭제
        </Button>
      </td>
    </tr>
  );
};

// --------------------------------------------------------------------------
const ApprovalLine = ({ showModal, handleModalClose, selectedApprovers,
  setSelectedApprovers,
  selectedReferences,
  setSelectedReferences,
  selectedReceivers,
  setSelectedReceivers }) => {
  const [activeTab, setActiveTab] = useState('approver');

  // 콘솔
  console.log("Selected References:", selectedReferences); // dept_code 포함 여부 확인
  console.log("Selected Receivers:", selectedReceivers);   // dept_code 포함 여부 확인

  const handleTabSelect = (tab) => setActiveTab(tab);

  const updateList = (prevList, data) => {
    console.log("Received data in updateList:", data);
  
    // data가 유효하지 않으면 처리하지 않고 그대로 반환
    if (!data || typeof data !== 'object') {
      console.warn("Invalid data provided:", data);
      return prevList;
    }
  
    // 중복 검사 로직 (emp_name, dept_name, dept_team_name을 조합한 키 생성)
    const newEntryKey = `${data.emp_name}-${data.dept_name}-${data.dept_team_name}`;
    const isDuplicate = prevList.some((entry) => {
        const entryKey = `${entry.emp_name}-${entry.dept_name}-${entry.dept_team_name}`;
        return entryKey === newEntryKey;
    });

    // 중복이 아닌 경우에만 데이터 추가
    if (!isDuplicate) {
        const newItem = {
            ...data,
            type: data.emp_name ? 'person' : data.team_name ? 'team' : 'department',
            team_name: data.team_name || '',
            dept_name: data.dept_name || '',
        };
  
      console.log("New item added to list:", newItem);
      return [...prevList, newItem];
    } else {
      console.log("Duplicate item found, not adding:", data);
    }
  
    return prevList;
  };

  // 결재자 탭의 드롭 설정
  const [{ isOverApprover }, dropApprover] = useDrop({
    accept: ITEM_TYPE,
    drop: (item) => {
      console.log("Dropped item in approver:", item);
      setSelectedApprovers((prev) => updateList(prev, item))
    },
    collect: (monitor) => ({
      isOverApprover: monitor.isOver(),
    }),
  });

  // 참조자 탭의 드롭 설정
  const [{ isOverReference }, dropReference] = useDrop({
    accept: ITEM_TYPE,
    drop: (item) => setSelectedReferences((prev) => updateList(prev, item)),
    collect: (monitor) => ({
      isOverReference: monitor.isOver(),
    }),
  });

  // 수신자 탭의 드롭 설정
  const [{ isOverReceiver }, dropReceiver] = useDrop({
    accept: ITEM_TYPE,
    drop: (item) => {
      console.log("Dropped item in approver:", item);
      setSelectedReceivers((prev) => updateList(prev, item));
    },
      collect: (monitor) => ({
      isOverReceiver: monitor.isOver(),
    }),
  });

 const handleRemovePerson = (index, type) => {
    if (type === 'approver') {
      setSelectedApprovers((prev) => prev.filter((_, i) => i !== index));
    } else if (type === 'reference') {
      setSelectedReferences((prev) => prev.filter((_, i) => i !== index));
    } else if (type === 'receiver') {
      setSelectedReceivers((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSelectChange = (index, value, type) => {
    const updateList = (list) =>
      list.map((item, idx) => (idx === index ? { ...item, approvalType: value } : item));

    if (type === 'approver') {
      setSelectedApprovers((prev) => updateList(prev));
    } else if (type === 'reference') {
      setSelectedReferences((prev) => updateList(prev));
    } else if (type === 'receiver') {
      setSelectedReceivers((prev) => updateList(prev));
    }
  };

  const moveRow = (dragIndex, hoverIndex, type) => {
    const updateList = (list) => {
      const updated = [...list];
      const dragItem = updated.splice(dragIndex, 1)[0];
      updated.splice(hoverIndex, 0, dragItem);
      return updated;
    };

    if (type === 'approver') {
      setSelectedApprovers((prev) => updateList(prev));
    } else if (type === 'reference') {
      setSelectedReferences((prev) => updateList(prev));
    } else if (type === 'receiver') {
      setSelectedReceivers((prev) => updateList(prev));
    }
  };

  const renderTable = (selectedPeople = [], type) => (
    <Table className={styles.selectedPeopleTable} bordered striped>
      <thead>
        <tr>
          <th>No</th>
          <th>부서 명</th>
          <th>팀 명</th>
          <th>직 급</th>
          <th>직원 명</th>
          {type === 'approver' && <th>결재 유형</th>} {/* 결재자 탭에서만 표시 */}
          <th>작업</th>
        </tr>
      </thead>
      <tbody>
        {selectedPeople.map((person, index) => (
          <DraggableRow
            key={index}
            person={person}
            index={index}
            type={type}
            moveRow={(dragIndex, hoverIndex) => moveRow(dragIndex, hoverIndex, type)}
            handleRemovePerson={() => handleRemovePerson(index, type)}
            handleSelectChange={(idx, value) => handleSelectChange(idx, value, type)}
            rowClass={styles.selectedRow}
          />
        ))}
      </tbody>
    </Table>
  );

  return (
    <Modal show={showModal} onHide={handleModalClose} size="lg" centered>
      <Modal.Header className={styles.apprModalHeader}>
        <Modal.Title>결재선 등록</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={handleTabSelect} className={styles.apprTabs}>
          <Tab eventKey="approver" title="결재자">
            <div className={styles.orgChartContainer}>
              <div className={styles.orgChartList}>
                <OrgChart enableDrag={true} />
              </div>
              <div
                ref={dropApprover}
                className={`${styles.apprTableContainer} ${isOverApprover ? styles.highlight : ''}`}
              >
                {renderTable(selectedApprovers, 'approver')}
                {isOverApprover && <p>추가하기</p>}
              </div>
            </div>
          </Tab>
          <Tab eventKey="reference" title="참조자">
            <div className={styles.orgChartContainer}>
              <div className={styles.orgChartList}>
                <OrgChart enableDrag={true} />
              </div>
              <div
                ref={dropReference}
                className={`${styles.apprTableContainer} ${isOverReference ? styles.highlight : ''}`}
              >
                {renderTable(selectedReferences, 'reference')}
                {isOverReference && <p>추가하기</p>}
              </div>
            </div>
          </Tab>
          <Tab eventKey="receiver" title="수신자">
            <div className={styles.orgChartContainer}>
              <div className={styles.orgChartList}>
                <OrgChart enableDrag={true} />
              </div>
              <div
                ref={dropReceiver}
                className={`${styles.apprTableContainer} ${isOverReceiver ? styles.highlight : ''}`}
              >
                {renderTable(selectedReceivers, 'receiver')}
                {isOverReceiver && <p>추가하기</p>}
              </div>
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="primary" onClick={() => handleModalClose(false)}>
        확인
      </Button>
      <Button variant="secondary" onClick={() => handleModalClose(true)}>
        취소
      </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApprovalLine;